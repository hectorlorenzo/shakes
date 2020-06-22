import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

export const PageHome: React.SFC<RouteComponentProps> = () => (
  <>
    <h2>Welcome to Shakes</h2>
    <nav>
      <Link to="/poem/create">Create a poem</Link>
      <Link to="/poem/join">Join a poem</Link>
      <Link to="/about">About</Link>
    </nav>
  </>
);
