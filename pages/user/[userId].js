import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectors } from "../../store";
import {
  getAProfile,
  postFollowUser,
  deleteUnfollowUser,
  getAProfileAuthed,
} from "../../network/lib/profile";
import {
  getArticlesGlobalFeed,
  getArticlesGlobalFeedAuthed,
} from "../../network/lib/article";
import { postFavorite, deleteUnFavorite } from "../../network/lib/favorites";
import { CogIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import FeedSection from "../../components/FeedSection";
import Head from "next/head";

const Profile = () => {
  const router = useRouter();
  const username = router.query.userId.substring(1);
  const { t } = useTranslation();
  const user = useSelector(selectors.getUser);
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);

  const [articles, setArticles] = useState([]);
  const [favoritedArticles, setFavoritedArticles] = useState([]);
  const [tagArticles, setTagArticles] = useState([]);
  const [profile, setProfile] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState("your_feed");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      getAProfileAuthed(username)
        .then((res) => {
          setProfile(res.data.profile);
          setDataReady(true);
        })
        .catch((err) => console.error(err));
      getArticlesGlobalFeedAuthed(`?author=${username}`)
        .then((res) => setArticles(res.data.articles))
        .catch((err) => console.error(err));
      getArticlesGlobalFeedAuthed(`?favorited=${username}`)
        .then((res) => setFavoritedArticles(res.data.articles))
        .catch((err) => console.error(err));
    } else {
      getAProfile(username).then((res) => {
        setProfile(res.data.profile);
        setDataReady(true);
      });
      getArticlesGlobalFeed(`?author=${username}`)
        .then((res) => setArticles(res.data.articles))
        .catch((err) => console.error(err));
      getArticlesGlobalFeed(`?favorited=${username}`)
        .then((res) => setFavoritedArticles(res.data.articles))
        .catch((err) => console.error(err));
    }
  }, [username, isLoggedIn]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedFeed("tag_feed");
    setSelectedTag(e.target.innerText);
    const query = `?tag=${e.target.innerText}`;
    if (isLoggedIn) {
      getArticlesGlobalFeedAuthed(query)
        .then((res) => setTagArticles(res.data.articles))
        .catch((err) => console.error(err));
    } else {
      getArticlesGlobalFeed(query)
        .then((res) => setTagArticles(res.data.articles))
        .catch((err) => console.error(err));
    }
  };

  const handleFollow = () => {
    if (profile.following) {
      deleteUnfollowUser(profile.username)
        .then((response) => {
          setProfile({
            ...profile,
            following: false,
          });
        })
        .catch((error) => console.error(error));
    } else {
      postFollowUser(profile.username)
        .then((response) => {
          setProfile({
            ...profile,
            following: true,
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditProfile = () => {
    router.push("/settings");
  };

  return (
    <>
    <Head>
      <title>{t("head.profile.title")}</title>
      <meta name="description" content="Real world app" />
      <link rel="icon" href="/images/favicon.png" />
    </Head>
      {dataReady && (
        <div className="">
          <div className="flex flex-col items-center justify-center p-3 2xs:py-5 max-w-screen  -mt-3 bg-sky-200 dark:bg-sky-800 space-y-3 rounded-b-3xl shadow-xl">
            <div className="relative w-20 h-20 2xs:w-16 2xs:h-16 rounded-full overflow-hidden">
              {profile.bio !== null ? (
                <Image
                  loader={() => profile.bio}
                  src={profile.bio}
                  alt={profile.username}
                  layout="fill"
                />
              ) : (
                <div className="bg-gradient-to-tr from-teal-400 to-teal-900 w-full h-full flex items-center justify-center text-white font-shadowsintolight text-5xl 2xs:text-4xl">
                  {profile.username.substring(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-sky-900 dark:text-sky-50 text-2xl 2xs:text-xl font-semibold ">
              {profile.username}
            </h2>
            <button
              className={
                "flex flex-row items-center space-x-1 px-3 py-1 ml-auto rounded-xl 2xs:text-sm border border-sky-800 dark:border-sky-200 hover:bg-sky-800 dark:hover:bg-sky-200 hover:text-white dark:hover:text-slate-800 " +
                (profile.username !== user.username && profile.following
                  ? "bg-sky-800 dark:bg-sky-200 text-white dark:text-slate-800"
                  : "text-sky-800 dark:text-sky-200")
              }
              onClick={
                profile.username !== user.username
                  ? handleFollow
                  : handleEditProfile
              }
            >
              {profile.username !== user.username ? (
                profile.following ? (
                  <>
                    <MinusIcon className="w-5 2xs:w-4" />
                    <p>{`${t("unfollow.text")} ${profile.username}`}</p>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 2xs:w-4" />
                    <p>{`${t("follow.text")} ${profile.username}`}</p>
                  </>
                )
              ) : (
                <>
                  <CogIcon className="w-5" />
                  <p>{t("edit.profile.title")}</p>
                </>
              )}
            </button>
          </div>
          <hr className="my-10" />
          <FeedSection
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
            articles={
              (selectedFeed === "your_feed" && articles) ||
              (selectedFeed === "favorited_feed" && favoritedArticles) ||
              (selectedFeed === "tag_feed" && tagArticles) ||
              []
            }
            setArticles={
              (selectedFeed === "your_feed" && setArticles) ||
              (selectedFeed === "favorited_feed" && setFavoritedArticles) ||
              (selectedFeed === "tag_feed" && setTagArticles) ||
              []
            }
            feeds={[
              {
                title:
                  profile.username !== user.username
                    ? t("articles.title")
                    : t("articles.my.title"),
                text: "your_feed",
              },
              {
                title:
                  profile.username !== user.username
                    ? t("articles.favorited.title")
                    : t("articles.my.favorited.title"),
                text: "favorited_feed",
              },
              { title: `# ${selectedTag}`, text: "tag_feed" },
            ]}
            handleSearch={handleSearch}
          />

          <section></section>
        </div>
      )}
    </>
  );
};

export default Profile;

export const getServerSideProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
