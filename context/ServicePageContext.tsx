import { DocData } from "components/types";
import { createContext, useContext } from "react";

interface IServicePageContext {
  serviceName: string;
  DocMap: Map<string, DocData>;
  getHomeData: () => DocData | null | undefined;
  getPageData: () => DocData | null | undefined;
  faviconUrl: string | undefined;
}

export const ServicePageContext = createContext({} as IServicePageContext);
export const useServiceData = () => useContext(ServicePageContext);
