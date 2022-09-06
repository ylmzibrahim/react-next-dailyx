import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/css/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getTags, getTagsAuthed } from "../network/lib/default";
import {
  getArticlesFeed,
  getArticlesGlobalFeed,
  getArticlesGlobalFeedAuthed,
} from "../network/lib/article";
import FeedSection from "../components/FeedSection";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { useRouter } from "next/router";
import TagsSection from "../components/TagsSection";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useSelector(selectors.getUser);
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [articles, setArticles] = useState([]);
  const [globalArticles, setGlobalArticles] = useState([]);
  const [tagArticles, setTagArticles] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(
    isLoggedIn ? "your_feed" : "global_feed"
  );

  const feeds = isLoggedIn
    ? [
        { title: t("your.feed.title"), text: "your_feed" },
        { title: t("global.feed.title"), text: "global_feed" },
        { title: `# ${selectedTag}`, text: "tag_feed" },
      ]
    : [
        { title: t("global.feed.title"), text: "global_feed" },
        { title: `# ${selectedTag}`, text: "tag_feed" },
      ];

  useEffect(() => {
    if (isLoggedIn) {
      getArticlesFeed()
        .then((response) => setArticles(response.data.articles))
        .catch((error) => {
          console.error(error);
          if (user.token !== undefined) router.reload();
        });
      getArticlesGlobalFeedAuthed()
        .then((response) => setGlobalArticles(response.data.articles))
        .catch((error) => console.error(error));
      getTagsAuthed()
        .then((response) => setTags(response.data.tags))
        .catch((error) => console.error(error));
    } else {
      getArticlesGlobalFeed()
        .then((response) => setGlobalArticles(response.data.articles))
        .catch((error) => console.error(error));
      getTags()
        .then((response) => setTags(response.data.tags))
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedFeed("tag_feed");
    setSelectedTag(e.target.innerText);
    const query = `?tag=${e.target.innerText}`;
    if (isLoggedIn)
      getArticlesGlobalFeedAuthed(query)
        .then((response) => setTagArticles(response.data.articles))
        .catch((error) => console.error(error));
    else
      getArticlesGlobalFeed(query)
        .then((response) => setTagArticles(response.data.articles))
        .catch((error) => console.error(error));
  };

  return (
    <div>
      <Head>
        <title>{t("head.home.title")}</title>
        <meta name="description" content="Real world app" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <main className="flex flex-row xs:flex-col w-full space-x-5 xs:space-x-0 xs:space-y-5">
        <div className="w-4/5 xs:w-full">
          <FeedSection
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
            articles={
              (selectedFeed === "your_feed" && articles) ||
              (selectedFeed === "global_feed" && globalArticles) ||
              (selectedFeed === "tag_feed" && tagArticles) ||
              []
            }
            setArticles={
              (selectedFeed === "your_feed" && setArticles) ||
              (selectedFeed === "global_feed" && setGlobalArticles) ||
              (selectedFeed === "tag_feed" && setTagArticles) ||
              []
            }
            feeds={feeds}
            handleSearch={handleSearch}
          />
        </div>
        <TagsSection
          tags={tags}
          title={t("popular.tags.title")}
          handleSearch={handleSearch}
        />
      </main>
      <footer></footer>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
