import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { useLayoutEffect, useState } from "react";
import authChecker from "../utils/authChecker";
import { Home } from "../pages/home";
import { Layout } from "../components/Layout";
import { Product } from "../pages/product";
import Client from "../pages/client";
import Spinner from "../components/Spinner";
import Supplier from "../pages/supplier";
import { User } from "../pages/user";
import Category from "../pages/Category";
import Setting from "../pages/setting";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Stats from "../pages/stats";
import { invoke } from "@tauri-apps/api/tauri";
import ClientFile from "../pages/clientFile";

export const Router = (props) => {
  const [isConnected, setIsConnected] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    const waitForIt = async () => {
      setIsConnected(await authChecker());
    };
    waitForIt();
    invoke("close_splashscreen");
    setLoading(false);
    props.setLoading(false);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <HashRouter>
      <Routes>
        {!isConnected && (
          <Route path="/" element={<Login setIsConnected={setIsConnected} />} />
        )}

        {isConnected && (
          <Route
            element={
              <Layout
                setIsConnected={setIsConnected}
                page={page}
                setPage={setPage}
              />
            }
          >
            {page === 0 && <Route path="/" />}
            {page === 1 && <Route path="/" element={<Home />} />}
            {page === 2 && <Route path="/" element={<ClientFile />} />}
            {page === 3 && <Route path="/" element={<Product />} />}
            {page === 4 && <Route path="/" element={<Client />} />}
            {page === 5 && <Route path="/" element={<Supplier />} />}
            {page === 6 && <Route path="/" element={<User />} />}
            {page === 7 && <Route path="/" element={<Category />} />}
            {page === 8 && <Route path="/" element={<Stats />} />}
            {page === 9 && <Route path="/" element={<Setting />} />}
            {page === 10 && <Route path="/" element={<Spinner />} />}
          </Route>
        )}
      </Routes>
    </HashRouter>
  );
};
