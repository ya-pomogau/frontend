import React from 'react';
import styles from './styles.module.css';
import { NoConectionPage } from './pages/NoConectionPage';
import { BlokedPage } from './pages/BlokedPage';
import { ErrorDialog } from 'shared/ui/error-dialog';
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
    if (errorType === 'any') {
      return (
        <>
          <ErrorHandlerContext.Provider value={setError}>
            <ErrorDialog text={errorText}></ErrorDialog>
            {children}
          </ErrorHandlerContext.Provider>
        </>
      );
    }
  }
  return (
    <ErrorHandlerContext.Provider value={setError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorBoundary;
