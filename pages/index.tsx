import { useEffect } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useRouter } from "next/router";
import { HomeNav } from "components/HomeNav";
import HomeHeaderComp from "components/HomeHeaderComp";
import { GetServerSideProps } from "next";
import { getAllServices } from "lib/minio";
import { BucketItemFromList } from "minio";

export const getServerSideProps: GetServerSideProps = async function (context) {
  return {
    props: {
      services: (await getAllServices()).map((service) => ({
        ...service,
        creationDate: service.creationDate.toISOString(),
      })),
    },
  };
};

export default function Main({ services }: { services: BucketItemFromList[] }) {
  return (
    <main className="bg-white dark:bg-background-900 min-h-screen flex flex-col bg-gradient-from-br bg-gradient-to-tl dark:from-background-900 dark:via-background-900 dark:to-background-800 from-background-50 via-primary-00 to-background-50">
      <div className="relative h-screen flex flex-col overflow-hidden">
        <HomeNav />
        <div className="relative flex-1 flex flex-col max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 px-4">
          <h4 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            All Example Docs
          </h4>
          <p className="mt-6 text-lg text-primary-600 text-center max-w-3xl mx-auto dark:text-primary-200">
            These ref docs for example services hosted using sigh.md
          </p>
          <div className="relative h-full w-full flex-1 flex justify-center mt-6">
            <Docs services={services} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Docs({ services }: { services: BucketItemFromList[] }) {
  const router = useRouter();
  return (
    <div className={`grid grid-cols-2 gap-4 w-full h-fit`}>
      {services.map((service) => (
        <div
          className="cursor-pointer h-fit mt-4 hover:drop-shadow-xl"
          key={service.name}
          onClick={() => {
            router.push(`/${service.name}`);
          }}
        >
          <div className="py-4 px-10 min-w-full-10 not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
            <div
              className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
              style={{ backgroundPosition: "10px 10px" }}
            ></div>
            <div className="relative rounded-xl overflow-auto p-8">
              <h1 className="text-4xl text-center uppercase">{service.name}</h1>
            </div>
            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
