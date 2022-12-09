import { useServiceData } from "context/ServicePageContext";

export function Footer() {
  const { serviceName } = useServiceData();
  return (
    <footer className="border-t border-background-100 dark:border-background-800 max-w-8xl mx-auto p-4 sm:px-6 md:px-8 w-full mt-auto flex">
      <div className="flex-1 flex gap-2">
        <h6 className="text-sm text-background-900 dark:text-white capitalize">
          {serviceName}
        </h6>{" "}
        <span className="text-sm text-background-300 dark:text-background-300">
          Documentation
        </span>
      </div>
      <div className="flex-2">
        <p className="text-sm text-background-200 dark:text-background-300">
          Powered by Sigh.md
        </p>
      </div>
    </footer>
  );
}
