import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./styles.module.css";


interface ContentLayoutProps {
  extClassName?: string;
  smart: ReactNode;
  isShowSmartHeaderInMobile?: boolean;
  children: ReactNode;
}

export const ContentLayout = ({
  extClassName,
  smart,
  children,
  isShowSmartHeaderInMobile=true
}: ContentLayoutProps) => {
  const classContent = isShowSmartHeaderInMobile ? styles.content : styles.content_no_smart_in_mobile;
  const classSmart = isShowSmartHeaderInMobile ? styles.smart : styles.no_smart_in_mobile;

  return(
  <div className={classnames(classContent, extClassName)}>
    <div className={classSmart}>
      {smart}
    </div>
    <div>
      {children}
    </div>
  </div>
  )
};
