import "../styles/globals.css";
import "../styles/prism.css";
// import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { GetServerSideProps, NextPageContext } from "next";
import { createContext, useContext } from "react";
// import { ThemeProvider } from "next-themes";

const ThemeProvider = dynamic(
  async () => (await import("next-themes")).ThemeProvider,
  {
    ssr: false,
  }
);

export const getInitialProps = async function (context: NextPageContext) {
  return { pageProps: { test: "data" } };
};

interface ISearchDataContext {}
const SearchDataContext = createContext({} as ISearchDataContext);
export const useSearchData = () => useContext(SearchDataContext);

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.querySelector("html")!.classList.add("dark");
  //   } else {
  //     document.querySelector("html")!.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

  return (
    <SearchDataContext.Provider value={{}}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SearchDataContext.Provider>
  );
}
