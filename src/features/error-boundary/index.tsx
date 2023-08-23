import React from 'react';
import { NoConectionPage } from './pages/NoConectionPage';
import { BlokedPage } from './pages/BlokedPage';
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
    if (errorType === 'connect') {
      return <NoConectionPage text={errorText} />;
    }
    if (errorType === 'bloked') {
      return <BlokedPage />;
    }
  }
  return (
    <ErrorHandlerContext.Provider value={setError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorBoundary;
