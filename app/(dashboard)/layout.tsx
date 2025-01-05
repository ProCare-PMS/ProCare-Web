import MainNav from "@/components/Main-Nav/MainNav";
import {  Inter  } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable}`}>
      <MainNav />
      <main className=" pt-12 bg-[#F5F5F5] ">{children}</main>{" "}
      {/* bg-[#F5F5F5] */}
    </div>
  );
}
