import React from "react";
import { RouteComponentProps } from "@reach/router";

import Poem from "../../modules/Poem";
import { PoemBox } from "../poem-box/PoemBox";

interface PagePoemProps extends RouteComponentProps {
  action?: "join" | "create";
}

export const PagePoem: React.SFC<PagePoemProps> = ({ action }) => {
  const poemInfo =
    action === "join"
      ? Poem.storage.getRandomPoem()
      : {
          poem: "",
          uuid: "",
        };

  return (
    <div>
      <h2>Poem</h2>
      <PoemBox poemText={poemInfo.poem} poemUuid={poemInfo.uuid} />
    </div>
  );
};
