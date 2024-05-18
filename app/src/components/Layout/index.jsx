import React, { useState } from "react";
import Aside from "../../components/Aside";
import { Outlet } from "react-router-dom";

export const Layout = (props) => {
  return (
    <main>
      <Aside
        setIsConnected={props.setIsConnected}
        page={props.page}
        setPage={props.setPage}
      />
      <Outlet />
    </main>
  );
};
