import { useServiceData } from "context/ServicePageContext";
import Link from "next/link";

export function Footer() {
  const { serviceName } = useServiceData();
  return (
    <footer className="absolute z-100 bottom-0 left-0 border-t pt-4 border-background-100 dark:border-background-800 mx-auto p-4 sm:px-6 md:px-8 w-full flex align-middle justify-between">
      <div className="">
        <div className="flex-1 flex gap-2">
          <h6 className="text-sm text-background-900 dark:text-white capitalize">
            {serviceName}
          </h6>{" "}
          <span className="text-sm text-background-300 dark:text-background-300">
            Documentation
          </span>
        </div>
        <div>
          <Link href="/" className="text-[0.8rem] text-primary-300 underline">All Docs</Link>
        </div>
      </div>
      <div className="flex-2 align-middle">
        <p className="text-sm text-background-200 dark:text-background-300">
          Powered by Sigh.md
        </p>
      </div>
    </footer>
  );
}
