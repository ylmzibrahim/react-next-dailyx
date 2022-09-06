import FeedTitles from "./FeedTitles";
import Article from "./Article";
import { useTranslation } from "next-i18next";

const FeedSection = ({ selectedFeed, setSelectedFeed, articles, setArticles, feeds, handleSearch }) => {
  const { t } = useTranslation();

  const setArticle = (article) => {
    setArticles((prevArticles) => {
      return prevArticles.map((prevArticle) => {
        if (prevArticle.slug === article.slug) {
          return article;
        }
        return prevArticle;
      });
    });
  }

  return (
    <section>
      <FeedTitles
        selectedFeed={selectedFeed}
        setSelectedFeed={setSelectedFeed}
        feeds={feeds}
      />
      <div className="rounded-b-2xl pt-2">
        <section className="space-y-2">
          {articles.length === 0 && (
            <p className="text-slate-500 dark:text-slate-50">{t("no.articles.found.text")}</p>
          )}
          {articles.length > 0 &&
            articles.map((article) => (
              <Article
                key={article.slug}
                article={article}
                setArticle={setArticle}
                handleSearch={handleSearch}
              />
            ))}
        </section>
      </div>
    </section>
  );
};

export default FeedSection;
