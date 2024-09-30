import MainNav from "@/components/Main-Nav/MainNav";
import DashboardNav from "./_components/DashboardNav"
 import { Open_Sans, Roboto_Mono, Inter, Nunito_Sans } from 'next/font/google'

// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   //👇 Add variable to our object
//   variable: '--font-opensans',
// })

 const inter = Inter({ 
   subsets: ["latin"],
   variable: '--font-inter' ,
 });

// const nunito_sans = Nunito_Sans({
//   subsets: ['latin'],
//   display: "swap",
//   variable: '--font-nunito-sans',
// })

// //👇 Configure the object for our second font
// const robotoMono = Roboto_Mono({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto-mono',
// })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <body
    //   className={`flex min-h-screen flex-col ${openSans.variable} ${nunito_sans.variable} ${inter.variable} ${robotoMono.variable}`}
    // >
    //   <MainNav />
    //   <main className=" pt-24 bg-[#F5F5F5] ">{children}</main>{" "}
    //   {/* bg-[#F5F5F5] */}
    // </body>

    <body className={`${inter.variable}`}>
      <MainNav />
      {/* <DashboardNav /> */}
      <main className=" pt-12 bg-[#F5F5F5] ">{children}</main>{" "}
      {/* bg-[#F5F5F5] */}
    </body>
  );
}
