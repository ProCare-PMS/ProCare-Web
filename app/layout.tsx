import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import Providers from "./Provider";
import LoadingWrapper from "@/components/Loader/LoadingWrapper";

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
    <html lang="en" translate="no">
      <body>
        <Providers>
          <QueryProvider>
            <LoadingWrapper>{children}</LoadingWrapper>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
