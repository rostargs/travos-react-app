import { Phonetic } from "../models/word.module";

export const playAudio = (isAudio: Phonetic | false) => {
  if (!isAudio) return;
  const audio = new Audio(isAudio.audio);
  audio.play();
};
