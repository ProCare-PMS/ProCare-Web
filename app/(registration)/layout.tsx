import { Open_Sans, Roboto, Inter, Nunito_Sans } from "next/font/google";

//👇 Configure our font object
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Registration({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${roboto.variable} ${inter.variable} bg-blue-600`}>
      {children}
    </main>
  );
}
