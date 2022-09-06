import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { postCreateArticle } from "../../network/lib/article";
import Head from "next/head";

const Editor = () => {
  const { t } = useTranslation();

  const [article, setArticle] = useState({
    article: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  });
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleCreateArticle = () => {
    if (article.article.title.length < 8) {
      setMessage({ message: t("editor.title.error"), type: "error" });
      return;
    } else if (article.article.description.length < 16) {
      setMessage({ message: t("editor.description.error"), type: "error" });
      return;
    } else if (article.article.body.length < 50) {
      setMessage({ message: t("editor.body.error"), type: "error" });
      return;
    } else if (article.article.tagList.length < 1) {
      setMessage({ message: t("editor.tags.error"), type: "error" });
      return;
    }

    postCreateArticle(article)
      .then((response) =>
        setMessage({ message: t("editor.create.success"), type: "success" })
      )
      .catch((error) => console.error(error));

    setArticle({
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    });
  };

  return (
    <div className="flex flex-col space-y-2 max-w-screen-sm mx-auto">
    <Head>
      <title>{t("head.article.new.title")}</title>
      <meta name="description" content="Real world app" />
      <link rel="icon" href="/images/favicon.png" />
    </Head>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
        <label htmlFor="editor_title" className="text-xs text-slate-400 dark:text-slate-500 mb-1">
          {t("article.title.title")}
        </label>
        <input
          id="editor_title"
          className="bg-slate-50 dark:bg-slate-800 outline-none"
          type="email"
          value={article.article.title}
          onChange={(e) =>
            setArticle({
              ...article,
              article: { ...article.article, title: e.target.value },
            })
          }
          required
        />
      </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
        <label
          htmlFor="editor_description"
          className="text-xs text-slate-400 dark:text-slate-500 mb-1"
        >
          {t("article.description.title")}
        </label>
        <input
          id="editor_description"
          className="bg-slate-50 dark:bg-slate-800 outline-none"
          type="email"
          value={article.article.description}
          onChange={(e) =>
            setArticle({
              ...article,
              article: { ...article.article, description: e.target.value },
            })
          }
          required
        />
      </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
        <label htmlFor="editor_body" className="text-xs text-slate-400 dark:text-slate-500 mb-1">
          {t("article.body.title")}
        </label>
        <textarea
          id="editor_body"
          rows={5}
          className="bg-slate-50 dark:bg-slate-800 outline-none"
          type="email"
          value={article.article.body}
          onChange={(e) =>
            setArticle({
              ...article,
              article: { ...article.article, body: e.target.value },
            })
          }
          required
        />
      </div>
          <div className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-lg border-2 border-slate-100 dark:border-slate-800 py-1 px-3 w-full rounded-xl text-sky-900 dark:text-sky-50 outline-sky-900 dark:outline-sky-50 mx-auto">
        <label htmlFor="editor_tags" className="text-xs text-slate-400 dark:text-slate-500 mb-1">
          {t("article.tags.title")}
        </label>
        <input
          id="editor_tags"
          className="bg-slate-50 dark:bg-slate-800 outline-none"
          type="email"
          value={article.article.tagList.join(" ")}
          onChange={(e) =>
            setArticle({
              ...article,
              article: {
                ...article.article,
                tagList: e.target.value.split(" "),
              },
            })
          }
          required
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
        onClick={handleCreateArticle}
      >
        <p>{t("article.publish.title")}</p>
        <PaperAirplaneIcon className="w-5 rotate-90" />
      </button>
    </div>
  );
};

export default Editor;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
