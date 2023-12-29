import { ApiResponse } from "../models/word.module";

export function insertionSort(obj: Record<string, ApiResponse[]>) {
  const keys = Object.keys(obj);
  const n = keys.length;

  for (let i = 1; i < n; i++) {
    const keyToInsert = keys[i];
    
    let j = i - 1;

    while (j >= 0 && obj[keys[j]] > obj[keyToInsert]) {
      keys[j + 1] = keys[j];
      j--;
    }

    keys[j + 1] = keyToInsert;
  }

  const sortedObject: Record<string, ApiResponse[]> = {};

  for (const key of keys) {
    sortedObject[key] = obj[key];
  }

  return sortedObject;
}
