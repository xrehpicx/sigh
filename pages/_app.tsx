import "../styles/globals.css";
import "../styles/prism.css";
// import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
// import { ThemeProvider } from "next-themes";


const ThemeProvider = dynamic(
  async () => (await import("next-themes")).ThemeProvider,
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.querySelector("html")!.classList.add("dark");
  //   } else {
  //     document.querySelector("html")!.classList.remove("dark");
  //   }
  // }, [isDarkMode]);
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
