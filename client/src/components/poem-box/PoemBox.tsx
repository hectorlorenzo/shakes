import React from "react";
import { navigate } from "@reach/router";

import { PoemInfo, storePoem } from "../../services/PoemStore";
import { PoemLine } from "../poem-line/PoemLine";

// const exampleSonnet = `Within a thick and spreading hawthorn bush
// That overhung a molehill large and round,
// I heard from morn to morn a merry thrush
// Sing hymns to sunrise, and I drank the sound
// With joy; and often, an intruding guest,
// I watched her secret toil from day to day
// How true she warped the moss to form a nest,
// And modelled it within with wood and clay;
// And by and by, like heath-bells gilt with dew,
// There lay her shining eggs, as bright as flowers,
// Ink-spotted over shells of greeny blue;
// And there I witnessed, in the sunny hours,
// A brood of nature's minstrels chirp and fly,
// Glad as the sunshine and the laughing sky.`;

interface PoemBoxProps {
  poem: PoemInfo;
}

const onChangeLine = (line: string, poem: PoemInfo) => {
  try {
    storePoem(poem.poem.concat([line]).join("\n"), poem.uuid);
    navigate("/");
  } catch (error) {
    throw new Error(`Hey, there was an error: ${error}`);
  }
};

export const PoemBox: React.SFC<PoemBoxProps> = ({ poem }) => {
  return (
    <>
      <p style={{ whiteSpace: "pre", lineHeight: "1.4" }}>
        {poem.poem.join("\n")}
      </p>
      <PoemLine onSubmit={(line) => onChangeLine(line, poem)} rhymesWith="" />
    </>
  );
};
