import type { Metadata } from "next";
import "./globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
      <>
        <body>{children}</body>
      </>
    </html>
  );
}
