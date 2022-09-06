import "../styles/css/globals.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components";
import { store } from "../store";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
