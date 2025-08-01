import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import Providers from "./Provider";
import LoadingWrapper from "@/components/Loader/LoadingWrapper";
import Script from "next/script";

import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "RxPMS ",
  description: "Pharmacy Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="en" translate="no" className={inter.className}>
      <head>
        <meta name="apple-mobile-web-app-title" content="RxPMS" />
      </head>
      <body>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
        <Script
          id="google-analytics-ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Providers>
          <QueryProvider>
            <LoadingWrapper>
            {children}
            </LoadingWrapper>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
