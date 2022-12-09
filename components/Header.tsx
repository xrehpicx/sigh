import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useRouter } from "next/router";
import { HomeNav } from "./HomeNav";
import HomeHeaderComp from "./HomeHeaderComp";

export function HomeHeader() {
  const router = useRouter();

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <HomeNav />
      <div className="relative flex-1 flex flex-col max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 px-4">
        <h4 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Multi Service Documentaion Server
        </h4>
        <p className="mt-6 text-lg text-primary-600 text-center max-w-3xl mx-auto dark:text-primary-200">
          Self host Documentation server for hosting multiple docs for multiple
          srevices in a single place
        </p>
        <div className="relative h-full w-full flex-1 flex justify-center mt-6">
          <HomeHeaderComp />
        </div>
      </div>
      <div
        className={`
          bottom-0 left-0
          w-full h-2/3
          bg-gradient-to-t dark:from-background-900 from-background-50 to-transparent
          z-10
          flex justify-center
      `}
      >
        <button
          className={`
          dark:bg-primary-200 bg-primary-400
            md:rounded-full
            rounded-t-2xl
            md:m-2
            -m-2
            h-fit
            px-4 py-1
            dark:text-black text-primary-50
            flex items-center justify-center gap-1
            hover:drop-shadow-lg
        `}
          onClick={(e) => {
            router.push("/alldocs");
          }}
        >
          <span>Docs</span> <OpenInNewRoundedIcon sx={{ fontSize: "1rem" }} />
        </button>
      </div>
    </div>
  );
}
