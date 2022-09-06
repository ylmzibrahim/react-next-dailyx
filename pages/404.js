import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-56 bg-white font-sans dark:bg-slate-700">
      <Head>
        <title>{t("head.home.title")}</title>
        <meta name="description" content="Real world app" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="bg-center dark:bg-slate-700">
        <div>
          <div className="grid col-span-full dark:bg-slate-700">
            <div className="text-center bg-center">
              <div className="bg-no-repeat h-96 bg-center bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')]">
                <p className="font-sans text-center font-bold text-7xl text-slate-700">
                  404
                </p>
              </div>
              <div className="-mt-16 dark:bg-slate-700">
                <div className="mt-5">
                  <p className="font-sans text-2xl font-semibold">
                    {t("404.title")}
                  </p>
                  <p className="font-sans text-lg ">{t("404.text")}</p>
                </div>

                <Link href={"/"}>
                  <div className="text-white py-3 px-5 bg-emerald-500 my-5 mx-0 inline-block font-bold font-sans">
                    {t("404.link")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
