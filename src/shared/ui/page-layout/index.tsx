import { ReactNode } from "react";

import classnames from "classnames";
import { useAppSelector } from "app/hooks";
import styles from "./styles.module.css";
import { Loader } from "../loader";

interface PageLayoutProps {
  extClassName?: string; 
  side: ReactNode;
  content: ReactNode;
}

export const PageLayout = ({
  extClassName, 
  side, 
  content,
}: PageLayoutProps) => {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  return (
    <>
      {isLoading && <Loader />}

      <div className={classnames(styles.main, extClassName)}>
        <div className={styles.side}> {side} </div>
        <div className={styles.content}> {content} </div>
      </div>
    </>
  );
}
