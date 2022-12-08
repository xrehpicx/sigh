import { CenterFocusStrong } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function Main() {
  const router = useRouter();

//   useEffect(() => {
//     router.push("");
//   }, [router]);

  return (
  <>
  <section>
      <div className="min-h-screen px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
        <h2 className="text-5xl max-w-xl mx-auto mt-8 text-left lg:text-center font-spooky animate-pulse">404!</h2>
        <h7 className="text-5xl max-w-xl mx-auto mt-8 text-left lg:text-center font-spooky animate-pulse">No such page exists</h7>
        </div>
      </div>
    </section>
  </>
  )
}
