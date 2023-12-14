import React from "react";
import { useGetTestsQuery } from "../app/api/testApi";
import Spinner from "../ui/Spinner";
import TestCard from "../components/test/TestCard";
import "../styles/TestList.scss";
import ErrorState from "../ui/ErrorState";

const TestList: React.FC = () => {
  const { data: tests, isLoading } = useGetTestsQuery();

  if (isLoading) return <Spinner />;

  const containerStyles = tests?.length ? { gridTemplateColumns: "repeat(4, 1fr)" } : { gridTemplateColumns: "1fr" };

  return (
    <ul className="test-list" style={containerStyles}>
      {tests?.length ? tests.map((test, index) => <TestCard {...test} key={index} />) : <ErrorState type="tests" />}
    </ul>
  );
};

export default TestList;
