import React from "react";

import { PoemLine } from "../poem-line/PoemLine";

const exampleSonnet = `Within a thick and spreading hawthorn bush
That overhung a molehill large and round,
I heard from morn to morn a merry thrush
Sing hymns to sunrise, and I drank the sound
With joy; and often, an intruding guest,
I watched her secret toil from day to day
How true she warped the moss to form a nest,
And modelled it within with wood and clay;
And by and by, like heath-bells gilt with dew,
There lay her shining eggs, as bright as flowers,
Ink-spotted over shells of greeny blue;
And there I witnessed, in the sunny hours,
A brood of nature's minstrels chirp and fly,
Glad as the sunshine and the laughing sky.`;

export const PoemBox: React.SFC<{}> = () => (
  <>
    <p style={{ whiteSpace: "pre", lineHeight: "1.4" }}>{exampleSonnet}</p>
    <PoemLine />
  </>
);
