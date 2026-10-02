create type public.apex_role as enum ('admin', 'sales', 'editor', 'technical');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.apex_role not null default 'sales',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.current_apex_role()
returns public.apex_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid()) and active = true
$$;

create or replace function public.is_apex_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists(select 1 from public.profiles where id = (select auth.uid()) and active = true)
$$;

create or replace function public.handle_new_apex_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_apex_user();

create table public.leads (
  id text primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text,
  company text,
  project_name text,
  project_location text,
  product_interest text,
  fire_rating text,
  source text not null default 'Biểu mẫu website',
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'lost')),
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  assignee text,
  next_follow_up_at timestamptz,
  notes text,
  consent boolean not null,
  consent_at timestamptz not null default now()
);

create index leads_status_created_idx on public.leads(status, created_at desc);
create index leads_assignee_idx on public.leads(assignee);

create table public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  category text not null,
  category_name text not null,
  fire_rating text,
  short_description text,
  material text,
  standard text,
  warranty text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'internal')),
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  image_alt text,
  updated_at timestamptz not null default now()
);

create table public.documents (
  id text primary key,
  title text not null,
  code text not null,
  document_type text,
  product_group text,
  standard text,
  owner text,
  scope text,
  issued_date date,
  expiry_date date,
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'internal')),
  source_reference text,
  verified_by text,
  verified_at timestamptz,
  notes text
);

create table public.contents (
  id text primary key,
  type text not null check (type in ('project', 'article', 'page')),
  title text not null,
  summary text,
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'internal')),
  publish_at timestamptz,
  owner text,
  featured boolean not null default false,
  media_approved boolean not null default false,
  client_approved boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.company_settings (
  id text primary key default 'apex',
  legal_name text not null,
  tax_code text,
  brand_name text not null,
  representative text,
  representative_title text,
  hotline text,
  zalo text,
  email text,
  response_time text,
  service_area text,
  addresses jsonb not null default '[]'::jsonb,
  default_seo_title text,
  default_seo_description text,
  updated_at timestamptz not null default now()
);

insert into public.company_settings (
  id, legal_name, brand_name, representative, representative_title, hotline, zalo,
  response_time, service_area, addresses, default_seo_title, default_seo_description
) values (
  'apex', 'Công ty TNHH APEX Việt Nam', 'APEX', 'Nguyễn Thị Ngọc Anh', 'Giám đốc',
  '0566 38 5555', '0566 38 5555', 'Phản hồi trong 1-2 ngày làm việc', 'Toàn quốc',
  '["Trụ sở 1: Số 10 ngõ 25, Sơn Đồng, Hà Nội", "Trụ sở 2: 11 Trần Thái Tông, Cầu Giấy, Hà Nội", "Nhà máy 1: Hương Ngải, Thạch Thất, Hà Nội", "Nhà máy 2: Đông Anh, Hà Nội"]'::jsonb,
  'APEX Việt Nam | Cửa và giải pháp ngăn cháy',
  'Tư vấn, sản xuất và cung ứng cửa thép, cửa cuốn, cửa kính và rèm ngăn cháy cho công trình trên toàn quốc.'
);

create table public.activities (
  id text primary key,
  created_at timestamptz not null default now(),
  actor text not null,
  action text not null,
  target text not null
);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.products enable row level security;
alter table public.documents enable row level security;
alter table public.contents enable row level security;
alter table public.company_settings enable row level security;
alter table public.activities enable row level security;

revoke all on table public.profiles, public.leads, public.products, public.documents, public.contents, public.company_settings, public.activities from anon, authenticated;
grant select on table public.profiles to authenticated;
grant select, insert, update on table public.leads, public.products, public.documents, public.contents, public.company_settings, public.activities to authenticated;

create policy "staff read own profile" on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.current_apex_role() = 'admin');

create policy "sales read leads" on public.leads for select to authenticated using (public.current_apex_role() in ('admin', 'sales'));
create policy "sales manage leads insert" on public.leads for insert to authenticated with check (public.current_apex_role() in ('admin', 'sales'));
create policy "sales manage leads update" on public.leads for update to authenticated using (public.current_apex_role() in ('admin', 'sales')) with check (public.current_apex_role() in ('admin', 'sales'));

create policy "staff read products" on public.products for select to authenticated using (public.is_apex_staff());
create policy "content roles insert products" on public.products for insert to authenticated with check (public.current_apex_role() in ('admin', 'editor', 'technical'));
create policy "content roles update products" on public.products for update to authenticated using (public.current_apex_role() in ('admin', 'editor', 'technical')) with check (public.current_apex_role() in ('admin', 'editor', 'technical'));

create policy "staff read documents" on public.documents for select to authenticated using (public.is_apex_staff());
create policy "technical roles insert documents" on public.documents for insert to authenticated with check (public.current_apex_role() in ('admin', 'technical'));
create policy "technical roles update documents" on public.documents for update to authenticated using (public.current_apex_role() in ('admin', 'technical')) with check (public.current_apex_role() in ('admin', 'technical'));

create policy "staff read contents" on public.contents for select to authenticated using (public.is_apex_staff());
create policy "editor roles insert contents" on public.contents for insert to authenticated with check (public.current_apex_role() in ('admin', 'editor'));
create policy "editor roles update contents" on public.contents for update to authenticated using (public.current_apex_role() in ('admin', 'editor')) with check (public.current_apex_role() in ('admin', 'editor'));

create policy "staff read company" on public.company_settings for select to authenticated using (public.is_apex_staff());
create policy "admin insert company" on public.company_settings for insert to authenticated with check (public.current_apex_role() = 'admin');
create policy "admin update company" on public.company_settings for update to authenticated using (public.current_apex_role() = 'admin') with check (public.current_apex_role() = 'admin');

create policy "staff read activities" on public.activities for select to authenticated using (public.is_apex_staff());
create policy "staff insert activities" on public.activities for insert to authenticated with check (public.is_apex_staff());
create policy "staff update activities" on public.activities for update to authenticated using (public.is_apex_staff()) with check (public.is_apex_staff());

create or replace function public.submit_lead(
  p_full_name text,
  p_phone text,
  p_email text default null,
  p_topic text default null,
  p_message text default null,
  p_consent boolean default false,
  p_website text default ''
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id text := gen_random_uuid()::text;
begin
  if coalesce(p_website, '') <> '' then
    raise exception 'Invalid submission';
  end if;
  if not p_consent then
    raise exception 'Consent is required';
  end if;
  if char_length(trim(p_full_name)) < 2 or char_length(trim(p_full_name)) > 120 then
    raise exception 'Invalid name';
  end if;
  if char_length(regexp_replace(p_phone, '[^0-9+]', '', 'g')) < 9 or char_length(p_phone) > 30 then
    raise exception 'Invalid phone';
  end if;
  if p_email is not null and char_length(p_email) > 160 then
    raise exception 'Invalid email';
  end if;
  if char_length(coalesce(p_message, '')) > 3000 then
    raise exception 'Message too long';
  end if;

  insert into public.leads (id, full_name, phone, email, product_interest, message, consent)
  values (new_id, trim(p_full_name), trim(p_phone), nullif(trim(p_email), ''), nullif(trim(p_topic), ''), nullif(trim(p_message), ''), true);

  insert into public.activities (id, actor, action, target)
  values ('activity-' || new_id, 'Website', 'Tiếp nhận yêu cầu tư vấn', trim(p_full_name));

  return new_id;
end;
$$;

revoke all on function public.submit_lead(text, text, text, text, text, boolean, text) from public;
grant execute on function public.submit_lead(text, text, text, text, text, boolean, text) to anon, authenticated;
grant execute on function public.current_apex_role() to authenticated;
grant execute on function public.is_apex_staff() to authenticated;
