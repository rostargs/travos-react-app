import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { BaseRoute, routes } from "./data/routes";

const App: React.FC = () => {
  useAuth();

  const renderRoutes = (routes: BaseRoute[]) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default App;
