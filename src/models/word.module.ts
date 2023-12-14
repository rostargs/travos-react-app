export type License = {
  name: string;
  url: string;
};

export type Phonetic = {
  text: string;
  audio: string;
  sourceUrl: string;
  license: License;
};

export type Definition = {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export type ApiResponse = {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
};
