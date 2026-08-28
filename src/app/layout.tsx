import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishue",
  description: "Style that keeps up with you — a wide range of trend-forward looks, priced to shop often.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LocaleProvider>
          <AuthProvider>
            <FavoritesProvider>
              <RecentlyViewedProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <AuthModal />
                <BackToTop />
              </RecentlyViewedProvider>
            </FavoritesProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
