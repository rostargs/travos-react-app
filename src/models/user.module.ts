import { TTest } from "../app/api/testApi";
import { ApiResponse } from "./word.module";

export type TResult = Pick<TTest, "name" | "id"> & { amountOfQuestions: number; rightAnswears: number; time: string };

export type TUser = {
  email: string | null;
  uid: string;
  textbook: Record<string, ApiResponse[]>;
  results: TResult[];
  isAdmin: boolean;
};
