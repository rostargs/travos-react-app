import { Phonetic } from "../models/word.module";

export const findAudio = (phonetics: Phonetic[] | undefined) => {
  return phonetics ? phonetics.find((item) => item.audio.length) : false;
};
