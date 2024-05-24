import React, { useState } from "react";
import { Router } from "./routing/router";
import "./App.css";
import Spinner from "./components/Other/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <Spinner />}
      <Router setLoading={setLoading} />
    </QueryClientProvider>
  );
}

export default App;
