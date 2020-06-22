import React from "react";
import { RouteComponentProps } from "@reach/router";

import { PoemBox } from "../poem-box/PoemBox";

export const PagePoem: React.SFC<RouteComponentProps> = () => (
  <div>
    <h2>Poem</h2>
    <PoemBox poem={[]} />
  </div>
);
