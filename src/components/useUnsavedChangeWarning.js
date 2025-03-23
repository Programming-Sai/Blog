import { useEffect } from "react";

const useUnsavedChangesWarning = (unsavedChanges, saveFunc) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    const handlePopState = (e) => {
      console.log("Moving away");
      if (unsavedChanges) {
        if (confirm("You have unsaved changes. Do you want to leave?")) {
          saveFunc(); // Save before allowing navigation
        } else {
          history.pushState(null, "", location.href); // Stay on the page
        }
      }
    };

    // Push an initial state to prevent leaving
    history.pushState(null, "", location.href);
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [unsavedChanges, saveFunc]);
};

export default useUnsavedChangesWarning;
