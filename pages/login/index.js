import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../../styles/css/Sign.module.css";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { actions } from "../../store";
import { postUserLogin } from "../../network/lib/user";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Head from "next/head";

const regexEmail = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const router = useRouter();

  const [user, setUser] = useState({
    user: {
      email: "",
      password: "",
    },
  });
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regexEmail.test(user.user.email)) {
      setMessage({ message: t("register.email.error"), type: "error" });
      return;
    }

    postUserLogin(user)
      .then((response) => {
        setMessage({ message: t("login.success"), type: "success" });
        setCookie("access_token", response.data.user.token, { path: "/" });
        dispatch(actions.setUser(response.data.user));
        dispatch(actions.setIsLoggedIn(true));
      })
      .catch((error) => {
        setMessage({ message: t("login.error"), type: "error" });
        console.error(error);
      });
  };

  return (
    <div className="container flex-col items-center justify-center mt-20 space-y-3">
    <Head>
      <title>{t("head.login.title")}</title>
      <meta name="description" content="Real world app" />
      <link rel="icon" href="/images/favicon.png" />
    </Head>
      <div className={styles.text_logo_container}>
        <div className={styles.text_logo_bg + " dark:from-sky-50/5 dark:via-sky-200/50 dark:to-sky-500/20"}>
          <h1 className={styles.text_logo + " dark:text-sky-300"}>Daily X</h1>
        </div>
      </div>
      <div className={styles.input_container + " dark:bg-sky-800 dark:border-sky-800"}>
        <label htmlFor="register_email" className={styles.input_label + " dark:text-slate-500"}>
          {t("email.title")}
        </label>
        <input
          id="register_email"
          className={styles.input_text + " dark:bg-sky-800 dark:text-sky-50"}
          type="email"
          value={user.user.email}
          onChange={(e) =>
            setUser({
              ...user,
              user: { ...user.user, email: e.target.value },
            })
          }
          required
        />
      </div>
      <div className={styles.input_container + " dark:bg-sky-800 dark:border-sky-800"}>
        <label htmlFor="register_password" className={styles.input_label + " dark:text-slate-500"}>
          {t("password.title")}
        </label>
        <input
          id="register_password"
          className={styles.input_text + " dark:bg-sky-800 dark:text-sky-50"}
          type="password"
          value={user.user.password}
          onChange={(e) =>
            setUser({
              ...user,
              user: { ...user.user, password: e.target.value },
            })
          }
          required
        />
      </div>
      {message.message !== "" && (
        <p
          className={
            "w-80 mx-auto text-center " +
            (message.type === "success" ? "text-green-500" : "text-red-500")
          }
        >
          {message.message}
        </p>
      )}
      <div className={styles.button_container + " dark:bg-sky-200 dark:border-sky-200 dark:hover:bg-sky-300 dark:hover:border-sky-300 dark:text-slate-800"} onClick={handleSubmit}>
        {t("login.title")}
      </div>
    </div>
  );
};

export default Login;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
