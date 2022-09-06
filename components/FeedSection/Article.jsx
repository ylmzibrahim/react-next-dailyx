import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { postFavorite, deleteUnFavorite } from "../../network/lib/favorites";
import { useSelector } from "react-redux";
import { selectors } from "../../store";

const Article = ({ article, setArticle, handleSearch }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      router.push("/register");
      return;
    }

    if (article.favorited) {
      deleteUnFavorite(article.slug)
        .then((response) => {
          setArticle(response.data.article);
        })
        .catch((error) => console.error(error));
    } else {
      postFavorite(article.slug)
        .then((response) => {
          setArticle(response.data.article);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <article
      key={article.slug}
      className="bg-slate-200 dark:bg-slate-800 p-5 rounded-3xl flex flex-col space-y-2"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={() => router.push(`/user/@${article.author.username}`)}
          >
            <Image
              loader={() => article.author.image}
              src={article.author.image}
              alt={article.author.username}
              layout="fill"
            />
          </div>
          <div className="flex flex-col ">
            <Link href={`/user/@${article.author.username}`}>
              <span className="text-sky-900 dark:text-sky-100 font-semibold cursor-pointer hover:underline">
                {article.author.username}
              </span>
            </Link>
            <span className="text-slate-400 dark:text-slate-500 text-xs">
              {new Date(article.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div>
          <button
            className={
              "flex flex-row items-center px-3 py-1 rounded-xl space-x-1 " +
              (article.favorited
                ? "bg-sky-800 dark:bg-sky-200 hover:bg-sky-900 dark:hover:bg-sky-300 text-white dark:text-slate-800"
                : "hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 border border-sky-800 dark:border-sky-200 text-sky-800 dark:text-sky-200")
            }
            onClick={handleFavorite}
          >
            <HeartIcon className="w-5" />
            <p className="text-sm">{article.favoritesCount}</p>
          </button>
        </div>
      </div>
      <Link href={`/article/${article.slug}`}>
        <div className="cursor-pointer">
          <h2 className="text-xl font-bold text-sky-900 dark:text-sky-100">{article.title}</h2>
          <p className="text-slate-400 dark:text-slate-500">{article.description}</p>
        </div>
      </Link>
      <div className="flex flex-wrap items-center justify-between">
        <Link href={`/article/${article.slug}`}>
          <p className="text-sky-900 dark:text-sky-100 text-sm cursor-pointer hover:underline pb-2.5">
            {t("read.more.text")}
          </p>
        </Link>
        <div className="flex space-x-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-100 pb-2.5">
          {article.tagList.map((tag, index) => (
            <button
              key={index}
              className="bg-sky-800 dark:bg-sky-200 hover:bg-sky-900 dark:hover:bg-sky-100 px-3 py-1 text-white dark:text-slate-800 rounded-full"
              onClick={handleSearch}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Article;
