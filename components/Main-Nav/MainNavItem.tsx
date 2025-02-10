import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface MainNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const MainNavItem = ({ href, icon: Icon, label }: MainNavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={true}
      className={clsx(
        "flex gap-2 items-center font-inter border-2 border-white text-sm px-3 py-1 font-semibold transition text-[#858C95]",
        isActive && "!border-2 !border-[#2648EA] rounded-[5px] !text-[#2648EA]"
      )}
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
