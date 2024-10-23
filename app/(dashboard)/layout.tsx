import MainNav from "@/components/Main-Nav/MainNav";
import DashboardNav from "./_components/DashboardNav";
import { Open_Sans, Roboto_Mono, Inter, Nunito_Sans } from "next/font/google";

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
    <body className={`${inter.variable}`}>
      <MainNav />
      {/* <DashboardNav /> */}
      <main className=" pt-12 bg-[#F5F5F5] ">{children}</main>{" "}
      {/* bg-[#F5F5F5] */}
    </body>
  );
}
