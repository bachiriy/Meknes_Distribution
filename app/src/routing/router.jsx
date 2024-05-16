import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { useLayoutEffect, useState } from "react";
import authChecker from "../utils/authChecker";
import { Home } from "../pages/home";
import { Layout } from "../components/Layout";

export const Router = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  useLayoutEffect(() => {
    const waitForIt = async () => {
      setIsConnected(await authChecker());
    };
    waitForIt();
    props.setLoading(false);
  }, []);
  return (
    <HashRouter>
      <Routes>
        {!isConnected && (
          <Route path="/" element={<Login setIsConnected={setIsConnected} />} />
        )}

        {isConnected && (
          <Route element={<Layout setIsConnected={setIsConnected} />}>
            <Route path="/" element={<Home />} />
          </Route>
        )}
      </Routes>
    </HashRouter>
  );
};
