import Cover from "@/components/cover";
import Header from "@/components/header";
import MetaPixel from "@/components/meta-pixel";
import { ThemeProvider } from "@/components/theme-provider";
import Cursor from "@/components/ui/cursor";
import {
  IubendaCookieSolutionBannerConfigInterface,
  IubendaProvider,
} from "@mep-agency/next-iubenda";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noxis Agency | Sviluppo creativo web e mobile",
  description:
    "Sviluppiamo siti web e app mobile su misura per startup e aziende. Soluzioni innovative, design moderno e performance ottimizzate per il tuo business.",
};

const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: parseInt(process.env.NEXT_PUBLIC_IUBENDA_SITE_ID!, 10),
  cookiePolicyId: parseInt(process.env.NEXT_PUBLIC_IUBENDA_COOKIE!, 10),
  lang: process.env.NEXT_PUBLIC_IUBENDA_LANG!,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistMono.className}>
        <IubendaProvider bannerConfig={iubendaBannerConfig}>
          {/* <IubendaBanner /> */}
          <MetaPixel />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Cover />
            <Header />
            {children}
            <Cursor />
          </ThemeProvider>
        </IubendaProvider>
      </body>
    </html>
  );
}
