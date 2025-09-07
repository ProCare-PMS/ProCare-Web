import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface MainNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  toggleMobileNav: () => void
}

const MainNavItem = ({ href, icon: Icon, label, toggleMobileNav }: MainNavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

 const isActive = pathname.startsWith(href);

  const handleClick = () => {
    // Only toggle mobile nav if on mobile screen
    if (window.innerWidth < 768) {
      toggleMobileNav();
    }
  };

  return (
    <Link
      href={href}
      prefetch={true}
      className={clsx(
        "flex gap-2 items-center font-inter border-2 border-white text-sm px-3 py-1 font-semibold transition text-[#858C95] w-full md:w-auto",
        "md:border-2 md:border-white",
        isActive && "!border-2 !border-[#2648EA] rounded-[5px] !text-[#2648EA]"
      )}
      onClick={handleClick}
    >
      <Icon
        size={22}
        className={clsx("text-[#909097]", isActive && "!text-[#2648EA]")}
      />
      {label}
    </Link>
  );
};

export default MainNavItem;