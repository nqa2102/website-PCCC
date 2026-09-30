import React, { useState } from 'react';
import { Phone, FileText, Search, Menu, X, ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
  onOpenSearch: () => void;
  onSelectProductCategory?: (category: string) => void;
  onSelectSolution?: (solutionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuote,
  onOpenSearch,
  onSelectProductCategory,
  onSelectSolution
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false);
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false);
  const [mobileSolutionExpanded, setMobileSolutionExpanded] = useState(false);

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
    { id: 'steel-door', name: 'Cửa thép ngăn cháy EI70 - EI120' },
    { id: 'glass-door', name: 'Cửa kính ngăn cháy' },
    { id: 'roller-shutter', name: 'Cửa cuốn ngăn cháy' },
    { id: 'fire-curtain', name: 'Rèm ngăn cháy' },
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
          
          {/* Logo Brand */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-hidden group shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors font-serif">
                APEX
              </span>
              <div className="w-0 h-0 border-l-[5px] sm:border-l-[6px] border-l-transparent border-r-[5px] sm:border-r-[6px] border-r-transparent border-b-[8px] sm:border-b-[10px] border-b-red-600 ml-1 -mt-2"></div>
            </div>
            <div className="hidden sm:block border-l border-neutral-300 pl-2.5">
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                {COMPANY_INFO.legalNameUpper}
              </p>
              <p className="text-[9px] sm:text-[10px] text-slate-500">
                Vững chuẩn an toàn, trọn niềm an tâm
              </p>
            </div>
          </button>

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
              href={COMPANY_INFO.hotlineHref}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="hidden lg:block">
                <span className="text-[10px] text-slate-500 block leading-tight">Hotline tư vấn</span>
                <span className="text-xs sm:text-sm font-bold text-red-600 group-hover:text-red-700 tracking-tight">
                  {COMPANY_INFO.hotlineDisplay}
                </span>
              </div>
            </a>

            {/* Quote Button (Desktop & Tablet) */}
            <button
              onClick={onOpenQuote}
              className="hidden sm:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Nhận báo giá</span>
            </button>

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
                  return (
                    <div 
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setProductDropdownOpen(true)}
                      onMouseLeave={() => setProductDropdownOpen(false)}
                    >
                      <button
                        onClick={() => {
                          setActiveTab('products');
                          setProductDropdownOpen(false);
                        }}
                        className={`flex items-center gap-1 py-3 px-3 border-b-2 transition-colors ${
                          isActive 
                            ? 'text-red-600 border-red-600' 
                            : 'text-slate-700 border-transparent hover:text-red-600'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {productDropdownOpen && (
                        <div className="absolute top-full left-0 w-72 bg-white border border-neutral-200 shadow-xl rounded-b-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Danh mục sản phẩm PCCC
                          </div>
                          {productCategories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveTab('products');
                                if (onSelectProductCategory) onSelectProductCategory(cat.id);
                                setProductDropdownOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-neutral-50 hover:text-red-600 flex items-center justify-between"
                            >
                              <span>{cat.name}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                          <div className="border-t border-neutral-100 mt-1 pt-1.5 px-3">
                            <button
                              onClick={() => {
                                setActiveTab('products');
                                setProductDropdownOpen(false);
                              }}
                              className="text-xs font-bold text-red-600 hover:underline py-1 block"
                            >
                              Xem toàn bộ danh mục sản phẩm →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === 'solutions') {
                  return (
                    <div 
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setSolutionDropdownOpen(true)}
                      onMouseLeave={() => setSolutionDropdownOpen(false)}
                    >
                      <button
                        onClick={() => {
                          setActiveTab('solutions');
                          setSolutionDropdownOpen(false);
                        }}
                        className={`flex items-center gap-1 py-3 px-3 border-b-2 transition-colors ${
                          isActive 
                            ? 'text-red-600 border-red-600' 
                            : 'text-slate-700 border-transparent hover:text-red-600'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {solutionDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 bg-white border border-neutral-200 shadow-xl rounded-b-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Giải pháp theo loại công trình
                          </div>
                          {solutionList.map((sol) => (
                            <button
                              key={sol.id}
                              onClick={() => {
                                setActiveTab('solutions');
                                if (onSelectSolution) onSelectSolution(sol.id);
                                setSolutionDropdownOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-neutral-50 hover:text-red-600 flex items-center justify-between"
                            >
                              <span>{sol.name}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`py-3 px-3 border-b-2 transition-colors ${
                      isActive 
                        ? 'text-red-600 border-red-600' 
                        : 'text-slate-700 border-transparent hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </button>
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

          {/* Nav links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              if (item.id === 'products') {
                return (
                  <div key={item.id} className="border-b border-neutral-100 pb-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveTab('products');
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex-1 ${
                          activeTab === 'products' ? 'text-red-600 bg-red-50' : 'text-slate-800'
                        }`}
                      >
                        Sản phẩm PCCC
                      </button>
                      <button
                        onClick={() => setMobileProductExpanded(!mobileProductExpanded)}
                        className="p-2 text-slate-500 hover:text-slate-800"
                        aria-label="Mở rộng danh mục sản phẩm"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {mobileProductExpanded && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-neutral-50 rounded-lg my-1">
                        {productCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveTab('products');
                              if (onSelectProductCategory) onSelectProductCategory(cat.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left py-2 px-2 text-xs text-slate-700 hover:text-red-600 flex items-center justify-between"
                          >
                            <span>{cat.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.id === 'solutions') {
                return (
                  <div key={item.id} className="border-b border-neutral-100 pb-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveTab('solutions');
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex-1 ${
                          activeTab === 'solutions' ? 'text-red-600 bg-red-50' : 'text-slate-800'
                        }`}
                      >
                        Giải pháp công trình
                      </button>
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
                          <button
                            key={sol.id}
                            onClick={() => {
                              setActiveTab('solutions');
                              if (onSelectSolution) onSelectSolution(sol.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left py-2 px-2 text-xs text-slate-700 hover:text-red-600 flex items-center justify-between"
                          >
                            <span>{sol.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between border-b border-neutral-100 last:border-0 ${
                    activeTab === item.id 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Yêu cầu dự toán & báo giá nhanh</span>
            </button>
            <a
              href={COMPANY_INFO.hotlineHref}
              className="w-full flex items-center justify-center gap-2 bg-neutral-100 text-slate-800 font-semibold text-xs sm:text-sm py-2.5 rounded-xl border border-neutral-200"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Hotline: {COMPANY_INFO.hotlineDisplay}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
