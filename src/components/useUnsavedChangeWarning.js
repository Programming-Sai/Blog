import { useEffect } from "react";

const useUnsavedChangesWarning = (unsavedChanges) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    const handlePopState = (e) => {
      console.log("Moving away");
      if (unsavedChanges && !confirm("You have unsaved changes. Do you want to leave?")) {
        history.pushState(null, "", location.href); // Push state back to stay on page
      } else {
        window.removeEventListener("popstate", handlePopState); // Allow navigation
        history.back(); // Move to the previous page
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
  }, [unsavedChanges]);
};

export default useUnsavedChangesWarning;
