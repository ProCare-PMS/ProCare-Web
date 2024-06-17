import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Provider";


export const metadata: Metadata = {
  title: "Procare",
  description: "Pharmacy Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
