"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems: NavItem[] = [
    { label: "Products", href: "/inventory/products" },
    { label: "Categories", href: "/inventory/categories" },
    { label: "Suppliers", href: "/inventory/suppliers" },
    { label: "Purchases", href: "/inventory/purchases" },
    { label: "Expiry Report", href: "/inventory/expiry-report" },
    { label: "BranchSync", href: "/inventory/branch-sync" }
  ];

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
  };

  const isActive = (href: string): boolean => pathname === href;

  return (
    <div className="w-full mt-[2rem]">
      <div className="bg-[#F5F5F5] py-5 w-full flex justify-center">
        {isMobile ? (
          <div className="relative w-full">
            <button 
              onClick={toggleMobileMenu} 
              className="w-full p-3 bg-[#F5F5F5] flex items-center justify-between"
            >
              <span className="font-inter text-sm font-semibold text-[#858C95]">
                {navItems.find(item => isActive(item.href))?.label || 'Menu'}
              </span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute z-10 w-full bg-white shadow-md">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`
                      block p-3 
                      text-sm 
                      font-inter 
                      font-semibold 
                      ${isActive(item.href)
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-[#858C95] hover:bg-gray-100'}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="flex gap-2">
              {navItems.map((item: NavItem, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`
                    font-inter text-sm font-semibold px-4 py-2 rounded-md transition-colors
                    ${isActive(item.href)
                      ? 'text-[#2A2A2E] border-b-2 border-[#295BFF] font-semibold text-sm' 
                      : 'text-[#858C95] font-semibold text-sm'}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`w-full bg-[#FAFBFC] ${isMobile ? 'min-h-auto' : 'min-h-screen'} mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;