"use client";
import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google"; // Assuming this package provides the GA component
import { usePathname } from "next/navigation";

const GoogleAnalyticsWrapper = () => {
  const pathname = usePathname();
  console.log("ANALYTICS: ", pathname);

  useEffect(() => {
    // Ensure GA only runs on non-admin pages
    if (pathname && !pathname.startsWith("/admin")) {
      // Track page view using Google Analytics
      if (window.gtag) {
        window.gtag(
          "config",
          process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
          {
            page_path: pathname,
          }
        );
      }
    }
  }, [pathname]);

  return (
    <>
      {/* <h1>{pathname}</h1> */}
      {!pathname.startsWith("/admin") && (
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}
        />
      )}
    </>
  );
};

export default GoogleAnalyticsWrapper;
