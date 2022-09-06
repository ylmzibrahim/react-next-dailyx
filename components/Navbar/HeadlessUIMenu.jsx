import { Fragment } from "react";
import {
  MenuIcon,
  LogoutIcon,
  CogIcon,
  DocumentAddIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";

const HeadlessUIMenu = ({ router, t }) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const logout = () => {
    removeCookie("access_token", { path: "/" });
    router.reload();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center justify-center">
        <Menu.Button>
          <MenuIcon
            className="h-7 fill-sky-800 hover:fill-sky-900 dark:fill-white dark:hover:fill-sky-100"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1" />
          <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push("/editor")}
                  className={`${
                    active
                      ? "bg-sky-900 text-white"
                      : "text-sky-900 dark:text-sky-50 font-semibold"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                >
                  {active ? (
                    <DocumentAddIcon
                      className="w-5 h-5 mr-2 text-sky-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <DocumentAddIcon
                      className="w-5 h-5 mr-2 text-sky-900 dark:text-sky-50"
                      aria-hidden="true"
                    />
                  )}
                  {t("new_article.title")}
                </button>
              )}
            </Menu.Item>
          <div className="px-1 py-1">
          <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push("/reports")}
                  className={`${
                    active
                      ? "bg-sky-900 text-white"
                      : "text-sky-900 dark:text-sky-50 font-semibold"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                >
                  {active ? (
                    <PresentationChartLineIcon
                      className="w-5 h-5 mr-2 text-sky-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <PresentationChartLineIcon
                      className="w-5 h-5 mr-2 text-sky-900 dark:text-sky-50"
                      aria-hidden="true"
                    />
                  )}
                  {t("reports.title")}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push("/settings")}
                  className={`${
                    active
                      ? "bg-sky-900 text-white"
                      : "text-sky-900 dark:text-sky-50 font-semibold"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                >
                  {active ? (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-sky-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <CogIcon
                      className="w-5 h-5 mr-2 text-sky-900 dark:text-sky-50"
                      aria-hidden="true"
                    />
                  )}
                  {t("settings.title")}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active
                      ? "bg-sky-900 text-white"
                      : "text-sky-900 dark:text-sky-50 font-semibold"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                >
                  {active ? (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-sky-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <LogoutIcon
                      className="w-5 h-5 mr-2 text-sky-900 dark:text-sky-50"
                      aria-hidden="true"
                    />
                  )}
                  {t("logout.title")}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeadlessUIMenu;
