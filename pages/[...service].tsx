import { HomeNav } from "components/HomeNav";
import { MarkdownComponents } from "components/MarkdownComponents";
import { DocData, MapItemType } from "components/types";
import { getDocsStruct, getDoc } from "lib/minio";
import { BucketItem } from "minio";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useContext, useMemo } from "react";
import pathListToTree, { TreeNode } from "path-list-to-tree";
import ReactMarkdown from "react-markdown";
import { linktree } from "lib/util";

interface IDocData {
  DocMapArr: MapItemType[] | null;
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const query = context.query as {
    service: string[];
  };
  const SerivceName = query.service[0];
  const Version = query.service[1];
  console.log(query.service, Version);
  // if (query.service[query.service.length - 1].includes(".") && fileFound) {
  //   query.service = query.service.slice(0, -1);
  //   console.log(query.service);
  // }

  const FilePath =
    query.service.length > 1
      ? `${query.service.slice(1, query.service.length + 1).join("/")}`
      : "";
  const DocStruct: BucketItem[] | null = await getDocsStruct(
    SerivceName,
    `/${Version}/`
  );

  console.log("cehcking");

  const fileFound = !!DocStruct?.find(
    (item) => item.name === FilePath || item.name === FilePath + ".md"
  );
  const folderFound =
    !fileFound &&
    !!DocStruct?.find(
      (item) => item.name === FilePath || item.name.includes(FilePath + "/")
    );

  console.log(FilePath, fileFound, folderFound);
  const promises = DocStruct
    ? DocStruct.map(async (item) => {
        // console.log(item);
        const mapItem: MapItemType = [
          item.name,
          {
            docString: await getDoc(SerivceName, item.name),
            lastModified: item.lastModified.toISOString(),
          },
        ];
        return mapItem;
      })
    : null;

  // if (query.service[query.service.length - 1].includes(".") || fileFound) {
  //   query.service = query.service.slice(0, -1);
  // }

  const DocMapArr = promises ? await Promise.all(promises) : null;

  const SerivceDocVersion = query.service[1];

  const props: IDocData = { DocMapArr };

  return {
    props,
    redirect: !(fileFound || folderFound)
      ? {
          destination: `/404`,
        }
      : undefined,
  };
};

interface IServicePageContext {
  serviceName: string;
  DocMap: Map<string, DocData>;
  getHomeData: () => DocData | null | undefined;
  faviconUrl: string | undefined;
}

const ServicePageContext = createContext({} as IServicePageContext);
const useServiceData = () => useContext(ServicePageContext);

export default function Doc({ DocMapArr }: IDocData) {
  const router = useRouter();
  const query = router.query as {
    service: string[];
  };
  const docData = useMemo(() => {
    const serviceName = query.service[0];
    const DocMap = new Map(DocMapArr);
    const favicon = Array.from(DocMap.keys()).find((pathString) =>
      pathString.endsWith("/favicon.ico")
    );
    const homePath = Array.from(DocMap.keys()).find((pathString) =>
      pathString.toLowerCase().endsWith("/readme.md")
    );

    function getHomeData() {
      return homePath ? DocMap.get(homePath) : null;
    }
    function getPathExists() {
      console.log(DocMap);
      return "hihih";
    }
    return {
      serviceName,
      DocMap,
      getHomeData,

      faviconUrl: favicon
        ? `http://${window.location.host}/api/static/${serviceName}/${favicon}`
        : favicon,
    };
  }, [DocMapArr, query.service]);

  return (
    <ServicePageContext.Provider value={docData}>
      <main className="bg-white dark:bg-background-900 h-screen">
        <HomeNav
          serviceName={docData.serviceName}
          faviconUrl={docData.faviconUrl}
        />
        <div>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
              <DocNav />
            </div>
            <div className="lg:pl-[19.5rem]">
              <ReactMarkdown
                className="text-background-900 dark:text-primary-50 max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16"
                components={MarkdownComponents}
                //need 404 page
              >
                {docData.getHomeData() != null
                  ? docData.getHomeData()!.docString
                  : "No such page Exists!!"}
              </ReactMarkdown>

              <RightDocNav />
            </div>
          </div>
        </div>
      </main>
    </ServicePageContext.Provider>
  );
}

interface NavTreeNode extends TreeNode {
  path?: string;
  children: NavTreeNode[];
}

function DocNav() {
  const { DocMap, serviceName } = useServiceData();
  console.log(DocMap);

  const navData = useMemo(() => {
    return Array.from(DocMap.keys()).filter((path) => path.includes(".md"));
  }, [DocMap]);

  console.log(linktree(navData)[0].children);

  return (
    <nav className="lg:text-sm lg:leading-6 relative">
      <NavSearch />
      <div className="flex flex-col">
        {linktree(navData)[0].children.map((child) => (
          <ExpanableNavItem key={child.name} node={child} />
        ))}
      </div>
    </nav>
  );
}

function RightDocNav() {
  return (
    <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
      <h1 className="text-primary-50">Test</h1>
    </div>
  );
}

function NavSearch() {
  return (
    <div className="sticky top-0 -ml-0.5 pointer-events-none">
      <div className="h-10" />
    </div>
  );
}

function ExpanableNavItem({ node }: { node: NavTreeNode }) {
  const title = !node.name.includes(".md") && node.children.length;
  const { serviceName } = useServiceData();
  const linkName = node.name.split(".md")[0].replaceAll("-", " ").toLowerCase();
  const titleName = node.name.replaceAll("-", " ");

  return (
    <div>
      {title ? (
        <Link
          href={`${serviceName}/${node.path}`.replace(".md", "")}
          className="capitalize my-2 -ml-1 block"
        >
          {titleName}
        </Link>
      ) : (
        <Link
          href={`${serviceName}/${node.path}`.replace(".md", "")}
          className="capitalize block border-l pl-4 border-transparent border-primary-200 dark:border-background-800 hover:border-primary-400 dark:hover:border-background-400 text-background-700 hover:text-slate-900 dark:text-background-200 dark:hover:text-slate-300"
        >
          {linkName}
        </Link>
      )}
      <div>
        {node.children.length
          ? node.children.map((child) =>
              !child.path?.toLowerCase().endsWith("readme.md") ? (
                <ExpanableNavItem key={child.name} node={child} />
              ) : null
            )
          : null}
      </div>
    </div>
  );
}
