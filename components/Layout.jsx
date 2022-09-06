import Navbar from "./Navbar/";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../store";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const router = useRouter();

  return (
    <div className="bg-slate-50 dark:bg-slate-700 min-h-screen flex flex-col">
      <Navbar />
      {(isLoggedIn || router.route === "/login" || router.route === "/register" || router.route === "/article/[articleSlug]" || router.route === "/404" || router.route === "/") && <div className="max-w-screen-lg w-full mx-auto p-3">{children}</div>}
    </div>
  );
};

export default Layout;
