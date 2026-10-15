import React, { useState } from 'react';
import {
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Calculator,
  ArrowRight,
  DoorClosed,
  Scan,
  GalleryVertical,
  Layers,
  Zap,
  Route,
  Server,
  Radio,
  Power,
} from 'lucide-react';
import { useLiveData } from '../admin/adminData';
import { ApexBrandLogo } from './brand';
import { pathForRoute, readRoute } from '../routing';
import { PRODUCT_CATEGORY_GROUPS } from './products/ProductCategoryGrid';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenQuote?: (category?: string) => void;
  onSelectProductCategory?: (category: string, productId?: string) => void;
  onSelectSolution?: (solutionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenQuote,
  onSelectProductCategory,
  onSelectSolution,
}) => {
  const { company, products } = useLiveData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  // Sau khi chọn 1 mục: ẩn menu tới khi chuột rời khỏi vùng menu (tránh hover giữ menu mở)
  const [productMenuSuppressed, setProductMenuSuppressed] = useState(false);
  const productButtonRef = React.useRef<HTMLAnchorElement | null>(null);
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false);

  const openProductDropdown = () => {
    setProductDropdownOpen(true);
    setProductMenuSuppressed(false);
  };

  const closeProductDropdown = () => {
    setProductDropdownOpen(false);
    setProductMenuSuppressed(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: string,
    itemId?: string,
    productId?: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    closeProductDropdown();
    if (tab === 'products' && onSelectProductCategory) {
      if (itemId || productId) {
        onSelectProductCategory(itemId || '', productId);
      }
    }
    if (tab === 'solutions' && itemId && onSelectSolution) {
      onSelectSolution(itemId);
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'products', label: 'Sản phẩm', hasDropdown: true },
    { id: 'projects', label: 'Dự án' },
    { id: 'documents', label: 'Tài liệu kỹ thuật' },
    { id: 'news', label: 'Tin tức' },
    { id: 'contact', label: 'Liên hệ' },
  ];

  const productCategories = [
    {
      id: 'cua-thep-ngan-chay',
      name: 'Cửa thép ngăn cháy',
      icon: DoorClosed,
      tag: 'PCCC Công Trình',
      shortDesc: 'Khung cánh thép gia cường, lõi cách nhiệt không cháy, ngăn lửa và khói độc.',
    },
    {
      id: 'cua-thep-van-go',
      name: 'Cửa thép vân gỗ chống cháy',
      icon: DoorClosed,
      tag: 'Thẩm Mỹ & An Toàn',
      shortDesc: 'Vân gỗ 3D sang trọng, chống cháy EI60–EI90, cách âm 35–40dB, thay thế cửa gỗ tự nhiên.',
    },
    {
      id: 'cua-kinh-ngan-chay',
      name: 'Cửa kính ngăn cháy',
      icon: Scan,
      tag: 'Kiến Trúc Mở',
      shortDesc: 'Hệ khung chịu lực kết hợp kính ngăn cháy đa tầng, lấy sáng và thẩm mỹ.',
    },
    {
      id: 'cua-cuon-ngan-chay',
      name: 'Cửa cuốn ngăn cháy',
      icon: GalleryVertical,
      tag: 'Khoảng Mở Lớn',
      shortDesc: 'Khoảng mở siêu trường nhịp lớn, đóng kín tự động khi nhận tín hiệu báo cháy.',
    },
    {
      id: 'rem-ngan-chay',
      name: 'Rèm ngăn cháy & khói',
      icon: Layers,
      tag: 'Ngăn Khói Trọng Lực',
      shortDesc: 'Vải sợi thủy tinh gia cường thép, giấu âm trần thẩm mỹ, tự động hạ khi báo động.',
    },
    {
      id: 'tu-dien',
      name: 'Tủ điện phân phối & điều khiển',
      icon: Zap,
      tag: 'Cơ Điện Hạ Thế',
      shortDesc: 'Vỏ tủ điện hạ thế, tủ MSB, DB và tủ điều khiển bơm PCCC gia công CNC chính xác.',
    },
    {
      id: 'thang-mang-cap',
      name: 'Thang máng cáp điện',
      icon: Route,
      tag: 'Hạ Tầng Dây Dẫn',
      shortDesc: 'Máng cáp, thang cáp mạ kẽm / nhúng nóng, bảo vệ cáp điện lực và tín hiệu PCCC.',
    },
    {
      id: 'tu-rack',
      name: 'Tủ rack mạng & viễn thông',
      icon: Server,
      tag: 'CNTT & Viễn Thông',
      shortDesc: 'Tủ mạng 19 inch (6U - 42U) chuẩn EIA-310-D, tải trọng cao, thông gió tối ưu.',
    },
    {
      id: 'nha-tram-shelter',
      name: 'Nhà trạm Shelter viễn thông',
      icon: Radio,
      tag: 'Module Dã Ngoại',
      shortDesc: 'Panel sandwich cách nhiệt, chống nước, chống ăn mòn dã ngoại cho trạm BTS.',
    },
    {
      id: 'tu-nguon-outdoor',
      name: 'Tủ nguồn Outdoor ngoài trời',
      icon: Power,
      tag: 'Nguồn Ngoài Trời',
      shortDesc: 'Kết cấu 2 lớp vỏ cách nhiệt IP55/IP65, bảo vệ bộ chỉnh lưu và ắc quy ngoài trời.',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 sm:py-3.5 gap-2 sm:gap-4">
          
          {/* Logo Brand APEX VN */}
          <ApexBrandLogo
            onClick={() => setActiveTab('home')}
            layout="horizontal"
            size="auto"
            theme="light"
            corporateName={company.legalNameUpper}
            slogan="Vững chuẩn an toàn, trọn niềm an tâm"
          />

          {/* Quick Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full pl-4 pr-10 py-2 text-xs bg-neutral-100 hover:bg-neutral-200/70 text-slate-800 rounded-full border border-neutral-200 flex items-center justify-between cursor-pointer transition-colors text-left"
            >
              <span className="text-slate-400 truncate">Tìm kiếm sản phẩm, dự án, tài liệu...</span>
              <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </button>
          </div>

          {/* Right Actions: Hotline, Quote, Mobile triggers */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Icon Trigger on Mobile */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 text-slate-600 hover:text-red-600 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Hotline */}
            <a 
              href={company.hotlineHref}
              className="flex items-center gap-2 text-left group"
              aria-label={`Gọi hotline ${company.hotlineDisplay}`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="hidden lg:block">
                <span className="text-[10px] text-slate-500 block leading-tight">Hotline tư vấn</span>
                <span className="text-xs sm:text-sm font-bold text-red-600 group-hover:text-red-700 tracking-tight">
                  {company.hotlineDisplay}
                </span>
              </div>
            </a>

            {/* Primary Quote CTA Button */}
            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote()}
                className="hidden sm:inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-3.5 py-2 rounded-lg text-xs transition-all shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Báo giá dự toán</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-red-600 focus:outline-hidden rounded-lg hover:bg-neutral-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <div className="hidden md:block border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center space-x-1 lg:space-x-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                
                if (item.id === 'products') {
                  const currentRoute = readRoute();
                  return (
                    <div 
                      key={item.id}
                      className="relative group"
                      onMouseEnter={openProductDropdown}
                      onMouseLeave={closeProductDropdown}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          closeProductDropdown();
                          productButtonRef.current?.focus();
                        }
                      }}
                    >
                      <a
                        ref={productButtonRef}
                        href="/san-pham"
                        aria-expanded={productDropdownOpen}
                        aria-haspopup="true"
                        onClick={(e) => {
                          // Bấm "Sản phẩm" đi thẳng trang danh mục; hover vẫn xổ dropdown
                          handleNavClick(e, 'products');
                          closeProductDropdown();
                        }}
                        className={`flex items-center gap-1 py-3 px-3 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-red-600 ${
                          isActive
                            ? 'text-red-600 border-red-600'
                            : 'text-slate-700 border-transparent hover:text-red-600 group-hover:text-red-600'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                          productDropdownOpen ? 'rotate-180 text-red-600' : 'group-hover:rotate-180'
                        }`} />
                      </a>

                      {/* DESKTOP MENU SẢN PHẨM: 2 nhóm danh mục, link trực tiếp tới /san-pham/<slug> */}
                      <div
                        className={`absolute top-full left-0 z-50 w-[340px] max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain rounded-b-xl border border-neutral-200 bg-white p-2 shadow-xl ${
                          productMenuSuppressed
                            ? 'hidden'
                            : productDropdownOpen
                              ? 'block'
                              : 'hidden md:group-hover:block md:group-focus-within:block'
                        }`}
                      >
                        {PRODUCT_CATEGORY_GROUPS.map((group) => (
                          <div key={group.label} className="py-1">
                            <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {group.label}
                            </p>
                            <ul className="space-y-0.5">
                              {group.ids.map((id) => {
                                const cat = productCategories.find((c) => c.id === id);
                                if (!cat) return null;
                                const IconComponent = cat.icon;
                                const isCurrentCat = currentRoute.tab === 'products' && currentRoute.category === cat.id;

                                return (
                                  <li key={cat.id}>
                                    <a
                                      href={`/san-pham/${cat.id}`}
                                      aria-current={isCurrentCat ? 'page' : undefined}
                                      onClick={(e) => {
                                        closeProductDropdown();
                                        setProductMenuSuppressed(true);
                                        (e.currentTarget as HTMLElement).blur();
                                        handleNavClick(e, 'products', cat.id);
                                      }}
                                      className={`group/item flex min-h-10 items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-red-600 ${
                                        isCurrentCat
                                          ? 'bg-red-50 font-semibold text-red-600'
                                          : 'text-slate-700 hover:bg-neutral-100 hover:text-slate-950'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <IconComponent
                                          className={`h-4 w-4 shrink-0 transition-colors ${
                                            isCurrentCat ? 'text-red-600' : 'text-slate-400 group-hover/item:text-red-600'
                                          }`}
                                          aria-hidden="true"
                                        />
                                        <span>{cat.name}</span>
                                      </div>
                                      <ChevronRight
                                        className="h-3.5 w-3.5 text-slate-300 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-red-600"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}

                        <div className="mt-2 border-t border-neutral-100 pt-2 px-1">
                          <a
                            href="/san-pham"
                            onClick={(e) => {
                              closeProductDropdown();
                              setProductMenuSuppressed(true);
                              (e.currentTarget as HTMLElement).blur();
                              handleNavClick(e, 'products');
                            }}
                            className="flex min-h-9 items-center justify-between rounded-lg bg-red-50/70 px-3 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-100 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-red-600"
                          >
                            <span>Xem toàn bộ 9 nhóm sản phẩm</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={pathForRoute(item.id)}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`py-3 px-3 border-b-2 transition-colors ${
                      isActive 
                        ? 'text-red-600 border-red-600' 
                        : 'text-slate-700 border-transparent hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right Mini Trust Badge */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Áp dụng QCVN 06:2022/BXD và Sửa đổi 1:2023</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu (Responsive Full Drawer) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white max-h-[calc(100vh-60px)] overflow-y-auto px-4 pt-3 pb-8 space-y-3 animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile search bar */}
          <div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs bg-neutral-100 text-slate-600 rounded-xl border border-neutral-200"
            >
              <span>Tìm kiếm sản phẩm, dự án, CAD...</span>
              <Search className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Mobile Quick Action Quote Button */}
          {onOpenQuote && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Yêu cầu báo giá dự toán ngay</span>
            </button>
          )}

          {/* Nav links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              if (item.id === 'products') {
                return (
                  <div key={item.id} className="border-b border-neutral-100 pb-1">
                    <div className="flex items-center justify-between">
                      <a
                        href="/san-pham"
                        onClick={(e) => handleNavClick(e, 'products')}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex-1 ${
                          activeTab === 'products' ? 'text-red-600 bg-red-50' : 'text-slate-800'
                        }`}
                      >
                        Sản phẩm PCCC
                      </a>
                      <button
                        onClick={() => {
                          setMobileProductExpanded(!mobileProductExpanded);
                        }}
                        className="p-2 text-slate-500 hover:text-slate-800"
                        aria-label="Mở rộng danh mục sản phẩm"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* MOBILE DANH MỤC SẢN PHẨM: 2 nhóm danh mục, link trực tiếp tới /san-pham/<slug> */}
                    {mobileProductExpanded && (
                      <div className="pl-1 pr-1 py-1 space-y-3 bg-neutral-50 rounded-xl my-1 border border-neutral-100">
                        {PRODUCT_CATEGORY_GROUPS.map((group) => (
                          <div key={group.label} className="space-y-1">
                            <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {group.label}
                            </p>
                            <div className="space-y-1">
                              {group.ids.map((id) => {
                                const cat = productCategories.find((c) => c.id === id);
                                if (!cat) return null;
                                const IconComponent = cat.icon;
                                const route = readRoute();
                                const isCurrentCat = route.tab === 'products' && route.category === cat.id;

                                return (
                                  <a
                                    key={cat.id}
                                    href={`/san-pham/${cat.id}`}
                                    aria-current={isCurrentCat ? 'page' : undefined}
                                    onClick={(e) => {
                                      setMobileMenuOpen(false);
                                      handleNavClick(e, 'products', cat.id);
                                    }}
                                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold border transition-colors ${
                                      isCurrentCat
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-slate-800 border-neutral-100 hover:text-red-600 hover:border-red-200 active:bg-neutral-100'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <IconComponent
                                        className={`w-4 h-4 shrink-0 ${isCurrentCat ? 'text-red-600' : 'text-slate-400'}`}
                                      />
                                      <span>{cat.name}</span>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <a
                          href="/san-pham"
                          onClick={(e) => {
                            setMobileMenuOpen(false);
                            handleNavClick(e, 'products');
                          }}
                          className="flex min-h-[44px] items-center justify-between rounded-lg bg-red-50/70 px-3 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-100 hover:text-red-800"
                        >
                          <span>Xem toàn bộ 10 nhóm sản phẩm</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={pathForRoute(item.id)}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between border-b border-neutral-100 last:border-0 ${
                    activeTab === item.id 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={company.hotlineHref}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-xs sm:text-sm py-3 rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi tư vấn: {company.hotlineDisplay}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
