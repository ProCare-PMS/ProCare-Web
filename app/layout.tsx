import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import Providers from "./Provider";

export const metadata: Metadata = {
  title: "ProHelium",
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
        <body>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </Providers>
  );
}
