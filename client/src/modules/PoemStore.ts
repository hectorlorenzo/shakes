import { v4 as uuidv4 } from "uuid";
uuidv4();

const POEMS_STORAGE_LABEL = "poems";

interface StoredPoems {
  [hash: string]: string;
}

const getStoredPoems = (): StoredPoems => {
  return JSON.parse(localStorage.getItem(POEMS_STORAGE_LABEL) || "{}");
};

export interface PoemStorage {
  getPoem: (uuid: string) => string | null;
  getRandomPoem: () => PoemInfo;
  poemCount: () => number;
  storePoem: (poem: string, uuid: string) => void;
}

export interface PoemInfo {
  poem: string;
  uuid: string;
}

const getRandomInt = (maxValue: number) => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

export const getRandomPoem = (): PoemInfo => {
  const currentPoems = getStoredPoems();
  const currentPoemsHash = Object.keys(currentPoems);
  const numberOfPoems = currentPoemsHash.length;
  const selectedHash = currentPoemsHash[getRandomInt(numberOfPoems)];

  return {
    poem: currentPoems[selectedHash],
    uuid: selectedHash,
  };
};

export const storePoem = (poem: string, uuid: string): void => {
  const currentPoems = getStoredPoems();
  const poemUuid = uuid || uuidv4();

  localStorage.setItem(
    POEMS_STORAGE_LABEL,
    JSON.stringify({
      ...currentPoems,
      [poemUuid]: poem,
    })
  );
};

export const getPoem = (uuid: string): string | null => {
  const currentPoems = getStoredPoems();

  if (currentPoems === null && !currentPoems[uuid]) return null;

  return currentPoems[uuid];
};

export const poemCount = (): number => Object.keys(getStoredPoems()).length;

export default {
  getPoem,
  getRandomPoem,
  storePoem,
};
