import React, { useState } from "react";
import { Router } from "./routing/router";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Spinner />}
      <Router setLoading={setLoading}/>
    </>
  );
}

export default App;
