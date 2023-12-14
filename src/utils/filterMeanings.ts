import { Meaning } from "../models/word.module";

export const filterMeanings = (meanings: Meaning[]) => {
  const details = meanings.filter((item) => item.definitions.filter((def) => def.definition && def.example));
  return details[0].definitions[0];
};
