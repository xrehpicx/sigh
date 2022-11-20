import { BucketItem } from "minio";
import pathListToTree, { TreeNode } from "path-list-to-tree";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  createContext,
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Menu, Switch, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import { DocData, MapItemType } from "./types";
import { useTheme } from "next-themes";

const Brightness5OutlinedIcon = dynamic(
  () => import("@mui/icons-material/Brightness5Outlined"),
  { ssr: false }
);
const DarkModeOutlinedIcon = dynamic(
  () => import("@mui/icons-material/DarkModeOutlined"),
  { ssr: false }
);

interface IDocPageContext {
  docStruct: TreeNode[] | null;
  docMap: Map<string, DocData> | null;
  serviceName: string;
}

const DocPageContext = createContext({} as IDocPageContext);
const useDocPage = () => useContext(DocPageContext);

export function WelcomeDocSection({
  welcomeDocMap,
  welcomeDocName,
}: {
  welcomeDocStruct: BucketItem[];
  welcomeDocMap: MapItemType[] | null;
  welcomeDocName: string;
}) {
  const docMap = useMemo(() => {
    return new Map(welcomeDocMap);
  }, [welcomeDocMap]);

  const docStruct = useMemo(() => {
    const versions = Array.from(
      new Set(
        welcomeDocMap?.map((mapVal) => {
          return mapVal[0].split("/")[0];
        })
      )
    );
    const paths = welcomeDocMap?.map((mapVal) => {
      return mapVal[0];
    });

    return paths ? pathListToTree(paths) : null;
  }, [welcomeDocMap]);

  return (
    <DocPageContext.Provider
      value={{ docStruct, docMap, serviceName: welcomeDocName }}
    >
      <div className="min-h-screen bg-background-50 dark:bg-background-900">
        <Nav />
      </div>
    </DocPageContext.Provider>
  );
}

function Nav() {
  const { docStruct, serviceName } = useDocPage();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    console.log(docStruct);
  }, [docStruct]);

  return (
    <nav className="flex justify-between p-4 px-6">
      <div className="flex align-middle gap-2">
        <h4 className="text-2xl dark:text-primary-300 text-primary-600 ">
          {serviceName}
        </h4>
        <VersionPicker />
      </div>
      <div className="flex align-middle gap-4">
        <GitHubIcon className="dark:text-primary-50 text-primary-800" />

        <Switch
          checked={isDarkMode}
          onChange={(e) => {
            setTheme(!e ? "light" : "dark");
          }}
          className={`${
            isDarkMode ? "bg-primary-800" : "bg-primary-100"
          } relative inline-flex h-6 w-11 items-center rounded-full align-middle`}
        >
          <span className="sr-only">Toggle Darkmode</span>
          <div
            className={`${
              isDarkMode ? "translate-x-6" : "translate-x-1"
            } h-4 w-4 transform rounded-full transition flex justify-center align-middle`}
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
  );
}

function VersionPicker() {
  const [version, setVersion] = useState("v1");
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full dark:text-primary-50 text-primary-800 bg-background-400 dark:bg-background-500 bg-opacity-20 px-3 py-1 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {version}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md dark:bg-transparent bg-primary-50 shadow-lg ring-primary-400 ring-2 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
