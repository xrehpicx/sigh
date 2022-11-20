import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

function useDarkMode(): [
  "dark" | "light" | undefined,
  Dispatch<SetStateAction<"dark" | "light" | undefined>>
] {
  const [theme, setTheme] = useState<"dark" | "light">();

  useEffect(() => {
    setTheme(
      typeof window !== "undefined" &&
        localStorage &&
        localStorage.getItem("theme")
        ? (localStorage.getItem("theme") as "dark" | "light")
        : "dark"
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      const interval = setInterval(() => {
        setTheme(
          window.document.documentElement.classList.contains("dark")
            ? "dark"
            : "light"
        );
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = theme === "dark";
    isDarkMode ? root.classList.remove("light") : root.classList.remove("dark");
    theme && root.classList.add(theme);
    localStorage.setItem("theme", theme || "dark");
  }, [theme]);

  return [theme, setTheme];
}

// export default useDarkMode;
