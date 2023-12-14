import { TResult } from "../models/user.module";
import { TSortResults } from "../pages/Stats";

export const sortResults = (results: TResult[]) => {
  const resultsByDate = new Set<TSortResults>();

  results.forEach((item) => {
    const { time, ...rest } = item;

    const currentDate = formatDate(time);

    let existingResult: TSortResults | undefined;
    for (const result of resultsByDate) {
      if (result.date === currentDate) {
        existingResult = result;
        break;
      }
    }

    if (existingResult) {
      existingResult.results.push(rest);
    } else {
      resultsByDate.add({ date: currentDate, results: [rest] });
    }
  });

  const sortedResults = Array.from(resultsByDate).map((item) => bubbleSort(item));
  return sortedResults;
};

const formatDate = (date: string): string => {
  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;
};

const bubbleSort = (data: TSortResults) => {
  const results = data.results;
  const resultsLength = results.length;
  for (let i = 0; i < resultsLength; i++) {
    for (let j = 0; j < resultsLength - i - 1; j++) {
      if (results[j].rightAnswears > results[j + 1].rightAnswears) {
        [results[j], results[j + 1]] = [results[j + 1], results[j]];
      }
    }
  }
  return data;
};
