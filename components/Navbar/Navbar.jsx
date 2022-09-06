import { useEffect, useRef, useState } from "react";
import styles from "../../styles/css/Navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../../store";
import { getUser } from "../../network/lib/user";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import HeadlessUIMenu from "./HeadlessUIMenu";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { t } = useTranslation();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const dispatch = useDispatch();
  const user = useSelector(selectors.getUser);
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const language = useSelector(selectors.getLanguage);
  const themeState = useSelector(selectors.getTheme);

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    dispatch(actions.setLanguage(router.locale));
    dispatch(actions.setTheme(currentTheme));

    if (
      cookies.access_token === undefined &&
      router.route !== "/login" &&
      router.route !== "/register" &&
      router.route !== "/article/[articleSlug]" &&
      router.route !== "/404" &&
      router.route !== "/"
    ) {
      router.push("/login");
    } else if (!isLoggedIn && cookies.access_token !== undefined) {
      getUser()
        .then((response) => {
          dispatch(actions.setUser(response.data.user));
          dispatch(actions.setIsLoggedIn(true));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            removeCookie("access_token", { path: "/" });
            router.push("/login");
          }
        });
    } else if (
      isLoggedIn &&
      (router.route === "/login" || router.route === "/register")
    ) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleChangeLanguage = () => {
    if (language === "en-US") {
      router.replace(router.asPath, router.asPath, { locale: "tr-TR" });
      dispatch(actions.setLanguage("tr-TR"));
    } else {
      router.replace(router.asPath, router.asPath, { locale: "en-US" });
      dispatch(actions.setLanguage("en-US"));
    }
  };

  const handleChangeTheme = () => {
    if (themeState === "light") {
      setTheme("dark");
      dispatch(actions.setTheme("dark"));
    } else {
      setTheme("light");
      dispatch(actions.setTheme("light"));
    }
  };

  return (
    <div className={styles.navbar + " dark:bg-slate-800"}>
      <div className={styles.links + " dark:text-white"}>
        <Link href="/">
          <div className={styles.logo_with_text}>
            <div className={styles.logo}>
              <Image
                src="/images/dailyx_logo.png"
                layout="fill"
                alt="ProfilePhoto"
              />
            </div>
            <div
              className={
                styles.text_logo_bg +
                " dark:from-sky-50/5 dark:via-sky-200/50 dark:to-sky-500/20"
              }
            >
              <h1 className={styles.text_logo + " dark:text-sky-300"}>
                Daliy X
              </h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="ml-auto mr-2 space-x-2 flex flex-row">
        <div className="flex items-center justify-center shadow-lg p-0.5">
          <button
            className="relative h-6 aspect-square"
            onClick={handleChangeTheme}
          >
            {themeState !== "dark" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
        <div className="flex items-center justify-center shadow-lg p-0.5">
          <button
            className="relative h-6 aspect-video"
            onClick={handleChangeLanguage}
          >
            {language === "en-US" ? (
              <Image
                src="/images/flag-united-states-america.png"
                layout="fill"
                alt="flag-united-states-america"
              />
            ) : (
              <Image
                src="/images/flag-turkey.png"
                layout="fill"
                alt="flag-turkey"
              />
            )}
          </button>
        </div>
      </div>
      {isLoggedIn ? (
        <div className={styles.logged_in_icons}>
          <Link href={`/user/@${user.username}`}>
            <div className={styles.profile_photo}>
              {user.image !== undefined && user.image !== null ? (
                <Image
                  loader={() => user.image}
                  src={user.image}
                  layout="fill"
                  alt="ProfilePhoto"
                />
              ) : (
                <div className="bg-gradient-to-tr from-teal-400 to-teal-900 w-full h-full rounded-full flex items-center justify-center text-white font-shadowsintolight text-2xl">
                  {user.username.substring(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
          <div className={styles.menu_icon}>
            <HeadlessUIMenu router={router} t={t} />
          </div>
        </div>
      ) : (
        <div className={styles.sign_texts + " dark:text-sky-50"}>
          <Link href={`/login`}>
            <li
              className={
                "hover:font-semibold " +
                (router.pathname === "/login" && "font-semibold")
              }
            >
              {t("signin.title")}
            </li>
          </Link>
          <Link href={`/register`}>
            <li
              className={
                "hover:font-semibold " +
                (router.pathname === "/register" && "font-semibold")
              }
            >
            {t("signup.title")}
            </li>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
