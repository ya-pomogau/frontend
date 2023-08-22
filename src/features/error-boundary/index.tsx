import React from 'react';
import { NoConectionPage } from './pages/NoConectionPage';

const ErrorHandlerContext = React.createContext(() => {});

type ErrorBoundaryProps = {
  errorType?: 'connect' | 'bloked' | 'any';
  errorText: string;
  children?: JSX.Element | JSX.Element[];
};

const setError = () => {};

const ErrorBoundary = ({
  errorType,
  errorText,
  children,
}: ErrorBoundaryProps) => {
  if (errorType) {
    return <NoConectionPage errorText={errorText} />;
  }
  return (
    <ErrorHandlerContext.Provider value={setError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorBoundary;
