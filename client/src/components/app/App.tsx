import React from "react";
import { Router } from "@reach/router";

import { PageHome } from "../page-home/PageHome";
import { PagePoem } from "../page-poem/PagePoem";

import "./App.css";

const App: React.SFC<{}> = () => {
  return (
    <>
      <Router>
        <PageHome path="/" />
        <PagePoem path="/poem" />
      </Router>
    </>
  );
};

export default App;
