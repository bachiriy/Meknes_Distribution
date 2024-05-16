import React from "react";
import Aside from "../../components/Aside";

export const Home = (props) => {
  return (
    <main>
      <Aside setIsConnected={props.setIsConnected} inPage={1} />
    </main>
  );
};
