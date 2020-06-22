import React from "react";
import { RouteComponentProps } from "@reach/router";

import { getRandomPoem } from "../../services/PoemStore";
import { PoemBox } from "../poem-box/PoemBox";

interface PagePoemProps extends RouteComponentProps {
  action?: "join" | "create";
}

export const PagePoem: React.SFC<PagePoemProps> = ({ action }) => {
  const poemInfo =
    action === "join"
      ? getRandomPoem()
      : {
          poem: [],
          uuid: "",
        };

  return (
    <div>
      <h2>Poem</h2>
      <PoemBox poem={poemInfo} />
    </div>
  );
};
