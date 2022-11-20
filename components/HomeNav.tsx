import { Switch } from "@headlessui/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Brightness5OutlinedIcon = dynamic(
  () => import("@mui/icons-material/Brightness5Outlined"),
  { ssr: false }
);
const DarkModeOutlinedIcon = dynamic(
  () => import("@mui/icons-material/DarkModeOutlined"),
  { ssr: false }
);

export function HomeNav({
  serviceName,
  faviconUrl,
}: {
  serviceName?: string;
  faviconUrl?: string;
}) {
  const { theme, setTheme } = useTheme();
  // const [theme, setTheme] = useDarkMode();
  // console.log(theme);

  const isDarkMode = theme === "dark";

  return (
    <div className="sticky w-full top-0 z-40 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-background-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-background-50/60 dark:bg-transparent">
      <div className="max-w-[1400px] mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <nav className="flex justify-between">
            <div className="flex items-center gap-2">
              {faviconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={faviconUrl} alt="favicon" width={20} height={20} />
              ) : null}
              <h4 className="text-xl text-primary-600 dark:text-primary-200">
                {serviceName || "😮‍💨 sigh.md"}
              </h4>
            </div>
            <div className="flex items-center gap-4">
              <GitHubIcon className="dark:text-primary-50 text-primary-800" />

              <Switch
                checked={isDarkMode}
                onChange={(e) => {
                  setTheme(!e ? "light" : "dark");
                }}
                className={`dark:bg-primary-800 bg-primary-100 relative inline-flex h-6 w-11 items-center rounded-full align-middle`}
              >
                <span className="sr-only">Toggle Darkmode</span>
                <div
                  className={`dark:translate-x-6 translate-x-1 h-4 w-4 transform rounded-full transition flex justify-center items-center`}
                >
                  {!isDarkMode ? (
                    <Brightness5OutlinedIcon
                      className="text-primary-800"
                      sx={{ fontSize: "1rem" }}
                    />
                  ) : (
                    <DarkModeOutlinedIcon sx={{ fontSize: "1rem" }} />
                  )}
                </div>
              </Switch>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
