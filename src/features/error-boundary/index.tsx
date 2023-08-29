import React from 'react';
import styles from './styles.module.css';
import { NoConectionPage } from './pages/NoConectionPage';
import { BlokedPage } from './pages/BlokedPage';
import { ErrorDialog } from 'shared/ui/error-dialog';
const ErrorHandlerContext = React.createContext(() => {});

type ErrorBoundaryProps = {
  errorText: string | null | undefined;
  children?: JSX.Element | JSX.Element[];
};

const setError = () => {};

const ErrorBoundary = ({ errorText, children }: ErrorBoundaryProps) => {
  if (errorText != null) {
    if (errorText === 'Ошибка подключения') {
      return <NoConectionPage text={errorText} />;
    }
    if (errorText === 'Пользователь заблокирован') {
      return <BlokedPage />;
    }
    {
      return (
        <>
          <ErrorDialog text={errorText}></ErrorDialog>
          <ErrorHandlerContext.Provider value={setError}>
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
