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

export const Router = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    const waitForIt = async () => {
      setIsConnected(await authChecker());
    };
    waitForIt();
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
            {page === 1 && <Route path="/" element={<Home />} />}
            {page === 2 && <Route path="/" element={<Product />} />}
            {page === 3 && <Route path="/" element={<Client />} />}
            {page === 4 && <Route path="/" element={<Supplier />} />}
            {page === 5 && <Route path="/" element={<Client />} />}
          </Route>
        )}
      </Routes>
    </HashRouter>
  );
};
