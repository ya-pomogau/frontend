import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./styles.module.css";

interface PageLayoutProps {
  extClassName?: string; 
  side: ReactNode;
  content: ReactNode;
}

export const PageLayout = ({
  extClassName, 
  side, 
  content,
}: PageLayoutProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <div className={styles.side}> {side} </div>
    <div className={styles.content}> {content} </div>
  </div>
);
