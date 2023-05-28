import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./styles.module.css";


interface ContentLayoutProps {
  extClassName?: string;
  smart: ReactNode;
  children: ReactNode;
}

export const ContentLayout = ({
  extClassName,
  smart,
  children,
}: ContentLayoutProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <div>{smart}</div>
    <div>{children}</div>
  </div>
);
