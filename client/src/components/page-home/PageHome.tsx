import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import Poem from "../../modules/Poem";

export const PageHome: React.SFC<RouteComponentProps> = () => {
  const areThereAnyPoems = Poem.storage.poemCount();

  return (
    <>
      <h2>Welcome to Shakes</h2>
      <nav>
        <Link to="/poem/create">Create a poem</Link>
        {areThereAnyPoems > 0 && <Link to="/poem/join">Join a poem</Link>}
        <Link to="/about">About</Link>
      </nav>
    </>
  );
};
