import { ProtectedRoute } from "../ProtectedRoute";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import Test from "../components/test/Test";
import Details from "../components/textbook/Details";
import Layout from "../hoc/Layout";
import Games from "../pages/Games";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Stats from "../pages/Stats";
import TestConstructor from "../pages/TestConstructor";
import TestList from "../pages/TestList";
import Textbook from "../pages/Textbook";

export type BaseRoute = {
  path: string;
  element: React.ReactElement;
  children?: BaseRoute[];
};

export const routes: BaseRoute[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "test-constructor",
        element: (
          <ProtectedRoute shouldBeAdmin>
            <TestConstructor />
          </ProtectedRoute>
        ),
      },
      {
        path: "textbook",
        element: (
          <ProtectedRoute>
            <Textbook />
          </ProtectedRoute>
        ),
        children: [{ path: ":word", element: <Details /> }],
      },
      { path: "games", element: <Games /> },
      { path: "games/test", element: <TestList /> },
      {
        path: "games/test/:id",
        element: (
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        ),
      },
      {
        path: "games/stats",
        element: (
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration />,
    children: [
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <Signup /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
];
