import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { LogoutIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { getUser, putUserUpdate } from "../../network/lib/user";
import { useSelector } from "react-redux";
import { selectors } from "../../store";
import { useCookies } from "react-cookie";
import Head from "next/head";

const regexUrl =
  /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const regexEmail = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
const regexPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,15}$/;

const Settings = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [user, setUser] = useState({
    user: {
      email: "",
      token: "",
      username: "",
      bio: "",
      image: "",
      password: "",
    },
  });
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data);
        setDataReady(true);
      })
      .catch((err) => console.error(err));
  }, []);
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleUpdateUser = () => {
    if (!regexUrl.test(user.user.image)) {
      setMessage({ message: t("settings.url.error"), type: "error" });
      return;
    } else if (
      user.user.username.length < 8 ||
      user.user.username.length > 16
    ) {
      setMessage({ message: t("settings.username.error"), type: "error" });
      return;
    } else if (user.user.bio === null || user.user.bio.length < 50) {
      setMessage({ message: t("settings.bio.error"), type: "error" });
      return;
    } else if (!regexEmail.test(user.user.email)) {
      setMessage({ message: t("settings.email.error"), type: "error" });
      return;
    } else if (!regexPassword.test(user.user.password)) {
      setMessage({ message: t("settings.password.error"), type: "error" });
      return;
    }

    putUserUpdate(user)
      .then((res) => {
        setMessage({ message: t("settings.success"), type: "success" });
        router.push(`/user/@${user.user.username}`)})
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    removeCookie("access_token", { path: "/" });
    router.reload();
  };

  return (
    <div className="flex flex-col space-y-2 max-w-screen-sm mx-auto">
    <Head>
      <title>{t("head.settings.title")}</title>
      <meta name="description" content="Real world app" />
      <link rel="icon" href="/images/favicon.png" />
    </Head>
      {dataReady && (
        <>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
            <label
              htmlFor="settings_pp"
               className="text-xs text-slate-400 dark:text-slate-500 mb-1"
            >
              {t("settings.pp.title")}
            </label>
            <input
              id="settings_pp"
              className="bg-slate-50 dark:bg-slate-800 outline-none"
              type="text"
              value={user.user.image || ""}
              onChange={(e) => {
                setUser({
                  ...user,
                  user: { ...user.user, image: e.target.value },
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
            <label
              htmlFor="settings_username"
               className="text-xs text-slate-400 dark:text-slate-500 mb-1"
            >
              {t("settings.username.title")}
            </label>
            <input
              id="settings_username"
              className="bg-slate-50 dark:bg-slate-800 outline-none"
              type="email"
              value={user.user.username}
              onChange={(e) => {
                setUser({
                  ...user,
                  user: { ...user.user, username: e.target.value },
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
            <label
              htmlFor="settings_bio"
               className="text-xs text-slate-400 dark:text-slate-500 mb-1"
            >
              {t("settings.bio.title")}
            </label>
            <textarea
              id="settings_bio"
              rows={5}
              className="bg-slate-50 dark:bg-slate-800 outline-none"
              type="email"
              value={user.user.bio || ""}
              onChange={(e) => {
                setUser({
                  ...user,
                  user: { ...user.user, bio: e.target.value },
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
            <label
              htmlFor="settings_email"
               className="text-xs text-slate-400 dark:text-slate-500 mb-1"
            >
              {t("settings.email.title")}
            </label>
            <input
              id="settings_email"
              className="bg-slate-50 dark:bg-slate-800 outline-none"
              type="email"
              value={user.user.email}
              onChange={(e) => {
                setUser({
                  ...user,
                  user: { ...user.user, email: e.target.value },
                });
              }}
              required
            />
          </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
            <label
              htmlFor="settings_password"
               className="text-xs text-slate-400 dark:text-slate-500 mb-1"
            >
              {t("settings.password.title")}
            </label>
            <input
              id="settings_password"
              className="bg-slate-50 dark:bg-slate-800 outline-none"
              type="password"
              value={user.user.password}
              onChange={(e) => {
                setUser({
                  ...user,
                  user: { ...user.user, password: e.target.value },
                });
              }}
            />
          </div>
          {message.message !== "" && (
            <p
              className={
                "text-left " +
                (message.type === "success" ? "text-green-500" : "text-red-500")
              }
            >
              {message.message}
            </p>
          )}
          <button
            className="ml-auto flex flex-row items-center space-x-2 bg-sky-800 dark:bg-sky-200 hover:bg-sky-900 dark:hover:bg-sky-300 text-white dark:text-slate-800 px-5 py-2 rounded-xl shadow-lg"
            onClick={handleUpdateUser}
          >
            <p>{t("settings.update.title")}</p>
            <PaperAirplaneIcon className="w-5 rotate-90" />
          </button>
          <button
            className="mr-auto flex flex-row items-center space-x-2 bg-red-800 dark:bg-red-200 hover:bg-red-900 dark:hover:bg-red-300 text-white dark:text-slate-800 px-5 py-2 rounded-xl shadow-lg"
            onClick={handleLogout}
          >
            <p>{t("settings.logout.title")}</p>
            <LogoutIcon className="w-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
