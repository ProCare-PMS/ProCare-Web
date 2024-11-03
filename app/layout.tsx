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
    <Providers>
      <html lang="en">
        <body>
          <QueryProvider>
            <LoadingWrapper>{children}</LoadingWrapper>
          </QueryProvider>
        </body>
      </html>
    </Providers>
  );
}
