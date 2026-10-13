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
import {
  groupProductsByVariant,
  formatMenuProductName,
  getCategorySubProducts,
} from './products/productMenu';

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const productButtonRef = React.useRef<HTMLAnchorElement | null>(null);
  const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false);
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false);
  const [mobileSolutionExpanded, setMobileSolutionExpanded] = useState(false);

  const openProductDropdown = () => {
    setProductDropdownOpen(true);
    setProductMenuSuppressed(false);
    const route = readRoute();
    if (route.tab === 'products' && route.category) {
      setExpandedCategory(route.category);
    } else {
      setExpandedCategory(null);
    }
  };

  const closeProductDropdown = () => {
    setProductDropdownOpen(false);
    setProductMenuSuppressed(false);
    setExpandedCategory(null);
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
    setSolutionDropdownOpen(false);
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
    { id: 'solutions', label: 'Giải pháp', hasDropdown: true },
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

  const solutionList = [
    { id: 'chung-cu-can-ho', name: 'Chung cư, căn hộ cao tầng' },
    { id: 'van-phong-toa-nha', name: 'Văn phòng, tòa nhà thương mại' },
    { id: 'trung-tam-thuong-mai', name: 'Trung tâm thương mại & Siêu thị' },
    { id: 'nha-xuong-khu-cong-nghiep', name: 'Nhà xưởng, khu công nghiệp' },
    { id: 'benh-vien-truong-hoc', name: 'Bệnh viện, trường học' },
    { id: 'khach-san-resort', name: 'Khách sạn, khu nghỉ dưỡng resort' },
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
              <span className="text-slate-400 truncate">Tìm kiếm sản phẩm, giải pháp, tài liệu...</span>
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

                      {/* DESKTOP MENU SẢN PHẨM: Accordion xổ danh sách sản phẩm con */}
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
                                const catSubProducts = getCategorySubProducts(products, cat.id);
                                const subProductCount = catSubProducts.length;
                                const isCatExpanded = expandedCategory === cat.id;

                                if (subProductCount === 0) {
                                  return (
                                    <li key={cat.id}>
                                      <a
                                        href={`/san-pham/${cat.id}`}
                                        onClick={(e) => {
                                          closeProductDropdown();
                                          setProductMenuSuppressed(true);
                                          (e.currentTarget as HTMLElement).blur();
                                          handleNavClick(e, 'products', cat.id);
                                        }}
                                        className="group/item flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-neutral-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-red-600"
                                      >
                                        <IconComponent
                                          className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover/item:text-red-600"
                                          aria-hidden="true"
                                        />
                                        <span>{cat.name}</span>
                                      </a>
                                    </li>
                                  );
                                }

                                return (
                                  <li key={cat.id}>
                                    <button
                                      type="button"
                                      aria-expanded={isCatExpanded}
                                      aria-controls={`desktop-menu-cat-${cat.id}`}
                                      onClick={() => {
                                        setExpandedCategory((prev) => (prev === cat.id ? null : cat.id));
                                      }}
                                      className="group/item flex w-full min-h-10 items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-neutral-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-red-600"
                                    >
                                      <div className="flex items-center gap-3">
                                        <IconComponent
                                          className={`h-4 w-4 shrink-0 transition-colors ${
                                            isCatExpanded ? 'text-red-600' : 'text-slate-400 group-hover/item:text-red-600'
                                          }`}
                                          aria-hidden="true"
                                        />
                                        <span className="text-left">{cat.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-semibold text-slate-400">
                                          {subProductCount}
                                        </span>
                                        <ChevronDown
                                          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
                                            isCatExpanded ? 'rotate-180 text-red-600' : ''
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                    </button>

                                    {isCatExpanded && (
                                      <div
                                        id={`desktop-menu-cat-${cat.id}`}
                                        className="space-y-1.5 py-1 pl-10 pr-1"
                                      >
                                        {groupProductsByVariant(catSubProducts, cat.id).map((vGroup, gIdx) => (
                                          <div key={gIdx} className="space-y-0.5">
                                            {vGroup.label && (
                                              <p className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                {vGroup.label}
                                              </p>
                                            )}
                                            <ul className="space-y-0.5">
                                              {vGroup.products.map((prod) => {
                                                const isCurrentProduct =
                                                  currentRoute.tab === 'products' &&
                                                  (currentRoute.itemId === prod.slug || currentRoute.itemId === prod.id);
                                                return (
                                                  <li key={prod.id}>
                                                    <a
                                                      href={`/san-pham/${cat.id}/${prod.slug || prod.id}`}
                                                      aria-current={isCurrentProduct ? 'page' : undefined}
                                                      onClick={(e) => {
                                                        closeProductDropdown();
                                                        setProductMenuSuppressed(true);
                                                        (e.currentTarget as HTMLElement).blur();
                                                        handleNavClick(e, 'products', cat.id, prod.id);
                                                      }}
                                                      className={`block min-h-9 rounded-md px-2.5 py-1.5 text-[13px] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-red-600 ${
                                                        isCurrentProduct
                                                          ? 'bg-red-50 font-bold text-red-600'
                                                          : 'text-slate-700 hover:bg-neutral-100 hover:text-slate-950'
                                                      }`}
                                                    >
                                                      <span className="line-clamp-2">{formatMenuProductName(prod.name)}</span>
                                                    </a>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          </div>
                                        ))}

                                        <a
                                          href={`/san-pham/${cat.id}`}
                                          onClick={(e) => {
                                            closeProductDropdown();
                                            setProductMenuSuppressed(true);
                                            (e.currentTarget as HTMLElement).blur();
                                            handleNavClick(e, 'products', cat.id);
                                          }}
                                          className="mt-1 flex min-h-9 items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-red-600"
                                        >
                                          <span>Xem tổng quan {cat.name.toLowerCase()} →</span>
                                        </a>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}

                        <a
                          href="/san-pham"
                          onClick={(e) => {
                            closeProductDropdown();
                            setProductMenuSuppressed(true);
                            (e.currentTarget as HTMLElement).blur();
                            handleNavClick(e, 'products');
                          }}
                          className="mt-1 flex min-h-10 items-center justify-between border-t border-neutral-100 px-3 pt-2 text-xs font-bold text-red-700 transition-colors hover:text-red-800 focus-visible:outline-2 focus-visible:outline-red-600"
                        >
                          <span>Xem tất cả sản phẩm</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  );
                }

                if (item.id === 'solutions') {
                  return (
                    <div 
                      key={item.id}
                      className="relative group"
                      onMouseEnter={() => setSolutionDropdownOpen(true)}
                      onMouseLeave={() => setSolutionDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSolutionDropdownOpen(!solutionDropdownOpen);
                        }}
                        className={`flex items-center gap-1 py-3 px-3 border-b-2 transition-colors cursor-pointer ${
                          isActive 
                            ? 'text-red-600 border-red-600' 
                            : 'text-slate-700 border-transparent hover:text-red-600 group-hover:text-red-600'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <div className={`absolute top-full left-0 w-80 bg-white border border-neutral-200 shadow-xl rounded-b-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                        solutionDropdownOpen ? 'block' : 'hidden md:group-hover:block'
                      }`}>
                        <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Giải pháp theo loại công trình
                        </div>
                        {solutionList.map((sol) => (
                          <a
                            key={sol.id}
                            href={`/giai-phap/${sol.id}`}
                            onClick={(e) => handleNavClick(e, 'solutions', sol.id)}
                            className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-neutral-50 hover:text-red-600 flex items-center justify-between"
                          >
                            <span>{sol.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </a>
                        ))}
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
              <span>Tìm kiếm sản phẩm, giải pháp, CAD...</span>
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
                          const next = !mobileProductExpanded;
                          setMobileProductExpanded(next);
                          if (next) {
                            const route = readRoute();
                            if (route.tab === 'products' && route.category) {
                              setMobileExpandedCategory(route.category);
                            }
                          }
                        }}
                        className="p-2 text-slate-500 hover:text-slate-800"
                        aria-label="Mở rộng danh mục sản phẩm"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* MOBILE DANH MỤC SẢN PHẨM: Accordion xổ danh sách con */}
                    {mobileProductExpanded && (
                      <div className="pl-1 pr-1 py-1 space-y-3 bg-neutral-50 rounded-xl my-1 border border-neutral-100">
                        {PRODUCT_CATEGORY_GROUPS.map((group) => (
                          <div key={group.label} className="space-y-1">
                            <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {group.label}
                            </p>
                            <div className="space-y-2">
                              {group.ids.map((id) => {
                                const cat = productCategories.find((c) => c.id === id);
                                if (!cat) return null;
                                const IconComponent = cat.icon;
                                const catSubProducts = getCategorySubProducts(products, cat.id);
                                const subProductCount = catSubProducts.length;
                                const isMobileCatExpanded = mobileExpandedCategory === cat.id;

                                if (subProductCount === 0) {
                                  return (
                                    <a
                                      key={cat.id}
                                      href={`/san-pham/${cat.id}`}
                                      onClick={(e) => {
                                        setMobileMenuOpen(false);
                                        handleNavClick(e, 'products', cat.id);
                                      }}
                                      className="flex min-h-[44px] items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 border border-neutral-100 transition-colors hover:text-red-600 hover:border-red-200 active:bg-neutral-100"
                                    >
                                      <IconComponent className="w-4 h-4 text-slate-400 shrink-0" />
                                      <span className="flex-1 truncate">{cat.name}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                    </a>
                                  );
                                }

                                return (
                                  <div key={cat.id} className="space-y-1">
                                    <button
                                      type="button"
                                      aria-expanded={isMobileCatExpanded}
                                      aria-controls={`mobile-menu-cat-${cat.id}`}
                                      onClick={() => {
                                        setMobileExpandedCategory((prev) => (prev === cat.id ? null : cat.id));
                                      }}
                                      className="flex min-h-[44px] w-full items-center justify-between rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 border border-neutral-100 transition-colors hover:text-red-600 hover:border-red-200 active:bg-neutral-100"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <IconComponent className={`w-4 h-4 shrink-0 transition-colors ${
                                          isMobileCatExpanded ? 'text-red-600' : 'text-slate-400'
                                        }`} />
                                        <span className="text-left font-semibold text-slate-800">{cat.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-semibold text-slate-400">{subProductCount}</span>
                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
                                          isMobileCatExpanded ? 'rotate-180 text-red-600' : ''
                                        }`} />
                                      </div>
                                    </button>

                                    {isMobileCatExpanded && (
                                      <div
                                        id={`mobile-menu-cat-${cat.id}`}
                                        className="space-y-2 rounded-lg bg-neutral-100/70 p-2 my-1 pl-3"
                                      >
                                        {groupProductsByVariant(catSubProducts, cat.id).map((vGroup, gIdx) => (
                                          <div key={gIdx} className="space-y-1">
                                            {vGroup.label && (
                                              <p className="px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                {vGroup.label}
                                              </p>
                                            )}
                                            <div className="space-y-2">
                                              {vGroup.products.map((prod) => {
                                                const route = readRoute();
                                                const isCurrent =
                                                  route.tab === 'products' &&
                                                  (route.itemId === prod.slug || route.itemId === prod.id);
                                                return (
                                                  <a
                                                    key={prod.id}
                                                    href={`/san-pham/${cat.id}/${prod.slug || prod.id}`}
                                                    aria-current={isCurrent ? 'page' : undefined}
                                                    onClick={(e) => {
                                                      setMobileMenuOpen(false);
                                                      handleNavClick(e, 'products', cat.id, prod.id);
                                                    }}
                                                    className={`flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-xs transition-colors ${
                                                      isCurrent
                                                        ? 'bg-red-50 font-bold text-red-600'
                                                        : 'bg-white text-slate-800 hover:text-red-600 active:bg-neutral-50'
                                                    }`}
                                                  >
                                                    <span className="line-clamp-2 leading-relaxed">
                                                      {formatMenuProductName(prod.name)}
                                                    </span>
                                                  </a>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}

                                        <a
                                          href={`/san-pham/${cat.id}`}
                                          onClick={(e) => {
                                            setMobileMenuOpen(false);
                                            handleNavClick(e, 'products', cat.id);
                                          }}
                                          className="flex min-h-[44px] items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-white"
                                        >
                                          <span>Xem tổng quan {cat.name.toLowerCase()} →</span>
                                        </a>
                                      </div>
                                    )}
                                  </div>
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
                          <span>Xem toàn bộ 9 nhóm sản phẩm</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.id === 'solutions') {
                return (
                  <div key={item.id} className="border-b border-neutral-100 pb-1">
                    <div className="flex items-center justify-between">
                      <a
                        href="/giai-phap"
                        onClick={(e) => handleNavClick(e, 'solutions')}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex-1 ${
                          activeTab === 'solutions' ? 'text-red-600 bg-red-50' : 'text-slate-800'
                        }`}
                      >
                        Giải pháp công trình
                      </a>
                      <button
                        onClick={() => setMobileSolutionExpanded(!mobileSolutionExpanded)}
                        className="p-2 text-slate-500 hover:text-slate-800"
                        aria-label="Mở rộng danh mục giải pháp"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {mobileSolutionExpanded && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-neutral-50 rounded-lg my-1">
                        {solutionList.map((sol) => (
                          <a
                            key={sol.id}
                            href={`/giai-phap/${sol.id}`}
                            onClick={(e) => handleNavClick(e, 'solutions', sol.id)}
                            className="w-full text-left py-2 px-2 text-xs text-slate-700 hover:text-red-600 flex items-center justify-between"
                          >
                            <span>{sol.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </a>
                        ))}
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
