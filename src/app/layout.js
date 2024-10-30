import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import ScrollToTopWrapper from "@/components/scrolltotopwrapper/ScrollToTopWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}

// ToDO 1. Add a robots.txt
//      2. Add alt text to all images
//      3. Fix Side Panel to look nicer
//      4. What are the techniques for good SEO
//      5. Clicking on the category name in a blog takes you to the categories page
//      6. Add Sitemap
//      7. Calculate the reading time for each blog.
//      8. What should be on the dashboard.
//      9.
