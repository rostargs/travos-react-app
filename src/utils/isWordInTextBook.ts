import { useGetUserTextbookQuery } from "../app/api/userApi";
import { RootState, useAppSelector } from "../app/store";

export const isWordInTextbook = (word: string): boolean => {
  const { uid } = useAppSelector((state: RootState) => state.login);
  if (!uid) throw new Error("No user found");
  const { data: textbook } = useGetUserTextbookQuery(uid);

  const textbookMap = textbook && new Map(Object.entries(textbook));

  return !!textbookMap?.has(word);
};
