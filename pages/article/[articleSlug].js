import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useSelector } from "react-redux";
import { selectors } from "../../store";
import {
  getAnArticle,
  deleteAnArticle,
  getAnArticleAuthed,
} from "../../network/lib/article";
import { postFollowUser, deleteUnfollowUser } from "../../network/lib/profile";
import { postFavorite, deleteUnFavorite } from "../../network/lib/favorites";
import {
  getComments,
  postCreateComment,
  deleteAComment,
  getCommentsAuthed,
} from "../../network/lib/comments";
import {
  HeartIcon,
  MinusIcon,
  PaperAirplaneIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

const Article = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { articleSlug } = router.query;
  const user = useSelector(selectors.getUser);
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);

  const [article, setArticle] = useState({});
  const [comment, setComment] = useState({
    comment: {
      body: "",
    },
  });
  const [comments, setComments] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getAnArticleAuthed(articleSlug)
        .then((response) => {
          setArticle(response.data.article);
          setDataReady(true);
        })
        .catch((error) => console.error(error));
      getCommentsAuthed(articleSlug)
        .then((response) => setComments(response.data.comments))
        .catch((error) => console.error(error));
    } else {
      getAnArticle(articleSlug)
        .then((response) => {
          setArticle(response.data.article);
          setDataReady(true);
        })
        .catch((error) => console.error(error));
      getComments(articleSlug)
        .then((response) => setComments(response.data.comments))
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  const handleFollow = () => {
    if (!isLoggedIn) {
      router.push("/register");
      return;
    }

    if (article.author.following) {
      deleteUnfollowUser(article.author.username)
        .then((response) => {
          setArticle({
            ...article,
            author: { ...article.author, following: false },
          });
        })
        .catch((error) => console.error(error));
    } else {
      postFollowUser(article.author.username)
        .then((response) => {
          setArticle({
            ...article,
            author: { ...article.author, following: true },
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      router.push("/register");
      return;
    }

    if (article.favorited) {
      deleteUnFavorite(articleSlug)
        .then((response) => {
          setArticle(response.data.article);
        })
        .catch((error) => console.error(error));
    } else {
      postFavorite(articleSlug)
        .then((response) => {
          setArticle(response.data.article);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleAddComment = () => {
    postCreateComment(articleSlug, comment)
      .then((response) => {
        setComments([...comments, response.data.comment]);
        setComment({ comment: { body: "" } });
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteComment = (commentId) => {
    deleteAComment(articleSlug, commentId);
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleEditArticle = () => {
    router.push(`/editor/${articleSlug}`);
  };

  const handleDeleteArticle = () => {
    deleteAnArticle(articleSlug)
      .then((response) => {
        router.push("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <title>{t("head.article.title")}</title>
        <meta name="description" content="Real world app" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      {dataReady && (
        <div className="flex flex-col">
          <div className="py-10 2xs:py-5 max-w-screen  -mt-3 bg-sky-200 dark:bg-sky-800 space-y-10 2xs:space-y-5 rounded-b-3xl shadow-xl">
            <h1 className="text-center text-sky-900 dark:text-sky-50 font-bold text-3xl 2xs:text-2xl px-2">
              {article.title}
            </h1>
            <div className="flex flex-row items-center justify-center space-x-20 2xs:space-x-5 3xs:flex-col 3xs:space-x-0 3xs:space-y-5">
              <div className="flex flex-row space-x-2">
                <div
                  className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                  onClick={() =>
                    router.push(`/user/@${article.author.username}`)
                  }
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
                    <span className="text-sky-900 dark:text-sky-50 font-semibold cursor-pointer hover:underline">
                      {article.author.username}
                    </span>
                  </Link>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2 3xs:flex-col 3xs:space-x-0 3xs:space-y-2">
                {article.author.username !== user.username ? (
                  <>
                    <button
                      className={
                        "flex flex-row items-center w-fit px-3 py-1 rounded-xl space-x-1 border border-sky-800 dark:border-sky-200 " +
                        (article.author.following
                          ? "bg-sky-800 dark:bg-sky-200 hover:bg-sky-900 dark:hover:bg-sky-300 text-white"
                          : "hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 text-sky-800 dark:text-sky-200")
                      }
                      onClick={handleFollow}
                    >
                      {article.author.following ? (
                        <MinusIcon className="w-5" />
                      ) : (
                        <PlusIcon className="w-5" />
                      )}
                      <p className="text-sm">
                        {`${
                          article.author.following
                            ? t("unfollow.text")
                            : t("follow.text")
                        }`}
                      </p>
                    </button>
                    <button
                      className={
                        "flex flex-row items-center w-fit px-3 py-1 rounded-xl space-x-1 border border-sky-800 dark:border-sky-200 " +
                        (article.favorited
                          ? "bg-sky-800 dark:bg-sky-200 hover:bg-sky-900 dark:hover:bg-sky-300 text-white dark:text-slate-800"
                          : "hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 text-sky-800 dark:text-sky-200")
                      }
                      onClick={handleFavorite}
                    >
                      <HeartIcon className="w-5" />
                      <p className="text-sm">
                        {`${
                          article.favorited
                            ? t("article.unfavorite.text")
                            : t("article.favorite.text")
                        }`}
                      </p>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex flex-row items-center w-fit px-3 py-1 rounded-xl space-x-1 hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 border border-sky-800 dark:border-sky-200 text-sky-800 dark:text-sky-200"
                      onClick={handleEditArticle}
                    >
                      <PencilAltIcon className="w-5" />
                      <p className="text-sm">{t("article.edit.title")}</p>
                    </button>
                    <button
                      className="flex flex-row items-center w-fit px-3 py-1 rounded-xl space-x-1 hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 border border-sky-800 dark:border-sky-200 text-sky-800 dark:text-sky-200"
                      onClick={handleDeleteArticle}
                    >
                      <TrashIcon className="w-5" />
                      <p className="text-sm">{t("article.delete.title")}</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="py-10 space-y-5">
            <p className="text-slate-500 dark:text-slate-400 text-center">{article.body}</p>
            <div className="flex flex-row items-center justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 py-2.5 space-x-1">
              {article.tagList.map((tag, index) => (
                <p
                  key={index}
                  className="bg-slate-400 text-white dark:text-slate-800 text-sm py-1 px-3 rounded-full w-fit"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <hr className="mb-10" />
          <div className="flex flex-col space-y-8">
            {comments.length !== 0 &&
              comments.map((current_comment, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start space-y-2"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <div
                        className="relative  w-7 h-7 rounded-full overflow-hidden cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/user/@${current_comment.author.username}`
                          )
                        }
                      >
                        <Image
                          loader={() => current_comment.author.image}
                          src={current_comment.author.image}
                          alt={current_comment.author.username}
                          layout="fill"
                        />
                      </div>
                      <Link href={`/user/@${current_comment.author.username}`}>
                        <span className="text-sky-900 dark:text-sky-100 font-semibold cursor-pointer hover:underline">
                          {current_comment.author.username}
                        </span>
                      </Link>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">
                        {new Date(
                          current_comment.updatedAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      {current_comment.author.username === user.username && (
                        <TrashIcon
                          className="w-5 cursor-pointer fill-red-800 dark:fill-red-200 hover:fill-red-900 dark:hover:fill-red-300"
                          onClick={() =>
                            handleDeleteComment(current_comment.id)
                          }
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 items-start justify-start text-left">
                    {current_comment.body}
                  </p>
                </div>
              ))}
          </div>

          <hr className="my-10" />
          <section>
            <textarea
              cols="30"
              rows="5"
              className={
                "w-full border border-sky-800 dark:border-sky-200 bg-slate-50 dark:bg-slate-900 rounded-xl px-5 py-2 " +
                (isLoggedIn ? "" : "opacity-50 cursor-not-allowed")
              }
              placeholder={t("comment.write.text")}
              value={comment.comment.body}
              onChange={(e) =>
                setComment({ comment: { body: e.target.value } })
              }
              disabled={!isLoggedIn}
            ></textarea>
            <button
              className={
                "ml-auto flex flex-row items-center space-x-2 bg-sky-800 dark:bg-sky-200 text-white dark:text-slate-800 px-5 py-2 rounded-xl " +
                (isLoggedIn
                  ? "hover:bg-sky-900 dark:hover:bg-sky-300"
                  : "opacity-50 cursor-not-allowed")
              }
              onClick={handleAddComment}
              disabled={!isLoggedIn}
            >
              <p>{t("comment.post.text")}</p>
              <PaperAirplaneIcon className="w-5 rotate-90" />
            </button>
            {!isLoggedIn && (
              <p className="text-center text-red-500 dark:text-red-400 mt-2">
                {t("comment.login.text")}
              </p>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Article;

export const getServerSideProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
