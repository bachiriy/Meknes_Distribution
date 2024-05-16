import React, { useState } from "react";
import Aside from "../../components/Aside";
import { Outlet } from "react-router-dom";

export const Layout = (props) => {
  const [page, setPage] = useState(1);
  return (
    <main>
      <Aside
        setIsConnected={props.setIsConnected}
        page={page}
        setPage={setPage}
      />
      <Outlet />
    </main>
  );
};
