import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
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
    <Providers>
      <html lang="en">
        <QueryProvider>{children}</QueryProvider>
      </html>
    </Providers>
  );
}
