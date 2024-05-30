import React, { useState } from "react";
import Aside from "../Aside";
import { Outlet } from "react-router-dom";

export const Layout = (props) => {
  return (
    <main className="overflow-hidden">
      <Aside
        setIsConnected={props.setIsConnected}
        page={props.page}
        setPage={props.setPage}
      />
      <Outlet />
    </main>
  );
};
