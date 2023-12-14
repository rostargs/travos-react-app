import React, { useMemo } from "react";
import { FcStatistics } from "react-icons/fc";
import "../styles/Stats.scss";
import { RootState, useAppSelector } from "../app/store";
import { useGetUserResultsQuery } from "../app/api/userApi";
import Spinner from "../ui/Spinner";
import { sortResults } from "../utils/sortResults";
import StatItem from "../components/games/StatItem";
import { TResult } from "../models/user.module";
import ErrorState from "../ui/ErrorState";

export type TSortResults = {
  date: string;
  results: Omit<TResult, "time">[];
};

const Stats: React.FC = () => {
  const { uid } = useAppSelector((state: RootState) => state.login);
  if (!uid) throw new Error("User not found");
  const { data: results, isLoading, isSuccess } = useGetUserResultsQuery(uid);
  const filterdResults = useMemo(() => (isSuccess ? sortResults(results) : []), [results]);

  if (isLoading) return <Spinner />;

  return (
    <div className="stats">
      <header className="stats__head">
        <FcStatistics />
        <h2>Statistics</h2>
      </header>
      <main className="stats__results" >
        {filterdResults.length ? (
          filterdResults.map((day, index) => {
            return <StatItem {...day} key={`stat-item-${index}`} />;
          })
        ) : (
          <ErrorState type="stats" />
        )}
      </main>
    </div>
  );
};

export default Stats;
