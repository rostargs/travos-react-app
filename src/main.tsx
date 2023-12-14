import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="travos-react-app">
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
