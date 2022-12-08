import { HomeNav } from "components/HomeNav";
import { MapItemType, WelcomePageProps } from "components/types";
import { getDocsStruct, getDoc } from "lib/minio";
import { BucketItem } from "minio";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

interface IDocData {
  DocMapArr: MapItemType[] | null;
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const query = context.query as {
    service: string[];
  };

  const SerivceName = query.service[0];
  console.log(query.service)
  if(query.service[(query.service.length - 1)].includes("."))  {
    query.service = query.service.slice(0, - 1);
    console.log(query.service)
  }
  const FilePath = query.service.length > 1 ? `/${query.service.slice(1, query.service.length + 1).join('/')}/`:''
  const DocStruct: BucketItem[] | null = await getDocsStruct(SerivceName, FilePath);
  const promises = DocStruct
    ? DocStruct.map(async (item) => {
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

  const DocMapArr = promises ? await Promise.all(promises) : null;

  const SerivceDocVersion = query.service[1];

  const props: IDocData = { DocMapArr };

  return {
    props,
  };
};

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
              components={{
                h1: ({ ...props }) => (
                  <h1 {...props} className="text-6xl my-2" />
                ),
                h2: ({ ...props }) => (
                  <h2 {...props} className="text-4xl my-2" />
                ),
                h3: ({ ...props }) => (
                  <h3 {...props} className="text-2xl my-2" />
                ),
                li: ({ ...props }) => (
                  <li {...props} className="list-disc ml-4" />
                ),
              }}
              //need 404 page 
            >
              {docData.getHomeData() !=null ? docData.getHomeData()!.docString : "No such page Exists!!"}
            </ReactMarkdown>

            <RightDocNav />
          </div>
        </div>
      </div>
    </main>
  );
}

function DocNav() {
  return (
    <nav className="lg:text-sm lg:leading-6 relative">
      <NavSearch />
      <h1 className="text-primary-50 text-xl">Test Nav</h1>
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
