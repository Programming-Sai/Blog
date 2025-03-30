"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUnsavedChangesWarning = (unsavedChanges, saveFunc) => {
  const router = useRouter();

  useEffect(() => {
    // Warn on browser refresh or close.
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    // Warn on browser back/forward navigation.
    const handlePopState = (e) => {
      if (unsavedChanges) {
        const confirmed = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmed) {
          // Navigate back to the current URL if the user cancels.
          router.replace(router.asPath);
        } else if (typeof saveFunc === "function") {
          saveFunc(); // Optionally save before leaving.
        }
      }
    };

    // Intercept clicks on links outside the editor.
    const handleLinkClick = (e) => {
      // Find the closest <a> element that was clicked.
      const anchor = e.target.closest("a");
      if (anchor && unsavedChanges) {
        const confirmed = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmed) {
          e.preventDefault();
        }
      }
    };

    // Attach event listeners.
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);

    // Cleanup on unmount.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [unsavedChanges, saveFunc, router]);
};

export default useUnsavedChangesWarning;
