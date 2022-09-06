import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { selectors } from "../../store";
import { getTags, getTagsAuthed } from "../../network/lib/default";
import {
  getArticlesGlobalFeed,
  getArticlesGlobalFeedAuthed,
} from "../../network/lib/article";
import React from "react";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import Moment from "moment";
import 'moment/locale/tr'  // without this line it didn't work

const Reports = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const language = useSelector(selectors.getLanguage);

  const [articlesGlobalFeed, setArticlesGlobalFeed] = useState([]);
  const [tags, setTags] = useState([]);
  const [days, setDays] = useState([]);
  const [countOfArticlesEachTag, setCountOfArticlesEachTag] = useState([]);
  const [countOfArticlesEachDay, setCountOfArticlesEachDay] = useState([]);

  const dataPie = {
    labels: tags,
    datasets: [
      {
        data: countOfArticlesEachTag,
        backgroundColor: [
          "#f97316",
          "#84cc16",
          "#14b8a6",
          "#6366f1",
          "#f43f5e",
          "#06b6d4",
        ],
        hoverBackgroundColor: [
          "#ea580c",
          "#65a30d",
          "#0d9488",
          "#4f46e5",
          "#e11d48",
          "#0891b2",
        ],
      },
    ],
  };

  const dataLine = {
    labels: days,
    datasets: [{
      label: t("count.articles.each.tag"),
      data: countOfArticlesEachDay,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  useEffect(() => {
    if (isLoggedIn) {
      getArticlesGlobalFeedAuthed()
        .then((response) => setArticlesGlobalFeed(response.data.articles))
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    if (articlesGlobalFeed.length > 0) {
      let tempTagsDuplicate = [];
      let tempDaysDuplicate = [];
      let tempTags = [];
      let tempDays = [];
      let tempCountsForTags = [];
      let tempCountsForDays = [];
      articlesGlobalFeed.forEach((article) => {
        tempTagsDuplicate.push.apply(tempTagsDuplicate, article.tagList);
        tempDaysDuplicate.push(Moment(article.updatedAt).locale(language).format("DD MMMM YYYY"));
      });

      // Getting the tags and its counts
      let tagAndCountList = tempTagsDuplicate.reduce(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {}
      );
      let dayAndCountList = tempDaysDuplicate.reduce(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {}
      );

      // Removing duplicates
      tempTags = tempTagsDuplicate.filter(function (item, pos) {
        return tempTagsDuplicate.indexOf(item) == pos;
      });
      tempDays = tempDaysDuplicate.sort().filter(function (item, pos) {
        return tempDaysDuplicate.indexOf(item) == pos;
      });

      // Getting the counts of each tag
      tempTags.forEach((tag) => {
        tempCountsForTags.push(tagAndCountList[tag]);
      });
      tempDays.forEach((tag) => {
        tempCountsForDays.push(dayAndCountList[tag]);
      });

      setTags(tempTags);
      setDays(tempDays);
      setCountOfArticlesEachTag(tempCountsForTags);
      setCountOfArticlesEachDay(tempCountsForDays);
    }
  }, [articlesGlobalFeed]);

  return (
    <div>
      <Head>
        <title>{t("head.reports.title")}</title>
        <meta name="description" content="Real world app" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="flex flex-col space-y-5 py-5">
        <div>
          <h2 className="text-center text-sky-800 dark:text-sky-200 font-bold text-2xl mb-2">
            {t("count.articles.each.tag")}
          </h2>
          <Pie data={dataPie} />
        </div>
        <div>
          <h2 className="text-center text-sky-800 dark:text-sky-200 font-bold text-2xl mb-2">
            {t("count.articles.each.day")}
          </h2>
          <Line data={dataLine} />
        </div>
      </div>
    </div>
  );
};

export default Reports;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
