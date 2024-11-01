"use client";
import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Parse the item if it exists, otherwise return the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue; // Return initial value if an error occurs
    }
  });

  const setValue = (value) => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window === "undefined") {
      console.warn("localStorage is not available in the server environment");
      return;
    }

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
