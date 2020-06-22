import { v4 as uuidv4 } from "uuid";
uuidv4();

const POEMS_STORAGE_LABEL = "poems";

const getStoredPoems = () => {
  return JSON.parse(localStorage.getItem(POEMS_STORAGE_LABEL) || "{}");
};

export const storePoem = (poem: string) => {
  const currentPoems = getStoredPoems();
  const newPoemUuid = uuidv4();

  localStorage.setItem(
    POEMS_STORAGE_LABEL,
    JSON.stringify({
      ...currentPoems,
      [newPoemUuid]: poem,
    })
  );
};

export const getPoem = (uuid: string): string | null => {
  const currentPoems = getStoredPoems();

  if (currentPoems === null && !currentPoems[uuid]) return null;

  return currentPoems[uuid];
};

// const savePoem = (uuid: string, poem: string) => {};
