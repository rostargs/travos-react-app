import { FallbackProps } from "react-error-boundary";
import ErrorPage from "./components/ErrorPage";

function ErrorFallback({ error, resetErrorBoundary }: Partial<FallbackProps>) {
  return <ErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />;
}

export default ErrorFallback;
