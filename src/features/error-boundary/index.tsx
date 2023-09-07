import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { enableError } from 'entities/error/model';

type ErrorBoundaryProps = {
  children: JSX.Element | JSX.Element[];
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const errorText = useAppSelector((state) => state.user.error!);
  const dispatch = useAppDispatch();
  console.log(errorText);
  useEffect(() => {
    if (errorText != null) {
      dispatch(enableError(errorText));
    }
  }, [errorText]);

  return <>{children}</>;
};

export default ErrorBoundary;
