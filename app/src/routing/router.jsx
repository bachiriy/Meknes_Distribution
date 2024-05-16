import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { useLayoutEffect, useState } from "react";
import authChecker from "../utils/authChecker";
import { Home } from "../pages/home";

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

          {isConnected && (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
        </Route>
      </Routes>
    </HashRouter>
  );
};
