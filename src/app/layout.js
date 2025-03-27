import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import ScrollToTopWrapper from "@/components/scrolltotopwrapper/ScrollToTopWrapper";
import AuthProvider from "@/providers/AuthProvider";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Ghana Trendz - Stay Updated, Stay Inspired",
    template: "%s | Ghana Trendz - Stay Updated, Stay Inspired"
  },
  description: "Ghana Trendz is your go-to hub for the latest in sports, news, lifestyle, music, and movies. Stay informed, entertained, and inspired with fresh content daily.",
  opengraph:{
    title: "Ghana Trendz - Stay Updated, Stay Inspired",
    description: "Ghana Trendz is your go-to hub for the latest in sports, news, lifestyle, music, and movies. Stay informed, entertained, and inspired with fresh content daily.",
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: 'GhanaTrendz',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container" id="top">
                <div className="wrapper">
                  <ScrollToTopWrapper>{children}</ScrollToTopWrapper>
                </div>
              </div>
              <span id="bottom" />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
      <GoogleAnalyticsWrapper />
    </html>
  );
}
