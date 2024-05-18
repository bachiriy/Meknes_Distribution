import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { useLayoutEffect, useState } from "react";
import authChecker from "../utils/authChecker";
import { Home } from "../pages/home";
<<<<<<< Updated upstream
=======
import { Layout } from "../components/Layout";
import { Product } from "../pages/product";
import Client from "../pages/client";
>>>>>>> Stashed changes

export const Router = () => {
  const [isConnected, setIsConnected] = useState(false);
  useLayoutEffect(() => {
    const waitForIt = async () => {
      setIsConnected(await authChecker());
    };
    waitForIt();
  });
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          {/* <Route index element={<IndexPage />} /> */}
          {!isConnected && (
            <Route
              path="/"
              element={<Login setIsConnected={setIsConnected} />}
            />
          )}

<<<<<<< Updated upstream
          {isConnected && (
            <>
              <Route path="/" element={<Home setIsConnected={setIsConnected} />} />
            </>
          )}
        </Route>
=======
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
            {page === 4 && <Route path="/" element={<Client />} />}
            {page === 5 && <Route path="/" element={<Client />} />}
          </Route>
        )}
>>>>>>> Stashed changes
      </Routes>
    </HashRouter>
  );
};
