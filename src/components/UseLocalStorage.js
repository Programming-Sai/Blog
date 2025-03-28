"use client";
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // Lazily initialize state from localStorage (if available)
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
    return initialValue;
  });

  // Optional: use an effect to update localStorage if the storedValue changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    if (typeof window === "undefined") {
      console.warn("localStorage is not available in the server environment");
      return;
    }
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
