import { useTranslation } from "next-i18next";

const FeedTitles = ({ selectedFeed, setSelectedFeed, feeds }) => {
  const { t } = useTranslation();

  // favorited_feed

  return (
    <div className="flex flex-row border-b border-sky-500">
      {feeds.length > 0 &&
        feeds.map((feed, index) => {
          if (
            feed.text !== "tag_feed" ||
            (selectedFeed === "tag_feed" && feed.title !== "# ")
          )
            return (
              <button
                key={index}
                className={
                  "rounded-t-2xl font-bold xs:font-semibold px-5 xs:px-3 py-3 xs:py-2 " +
                  (selectedFeed === feed.text
                    ? "bg-gradient-to-tr from-sky-500/90 dark:from-sky-500/30 to-pink-500/90 dark:to-pink-500/30 text-white dark:text-sky-100"
                    : "text-sky-700 dark:text-sky-300")
                }
                onClick={() => setSelectedFeed(feed.text)}
              >
                {feed.title}
              </button>
            );
        })}
    </div>
  );
};

export default FeedTitles;
