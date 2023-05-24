import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface SmartHeaderProps {
  extClassName?: string;
  settingText?: string;
  settingIcon?: ReactNode;
  filterText?: string;
  filterIcon?: ReactNode;
  handlerFilter?: () => void;
}
export const SmartHeader = ({
  extClassName,
  settingText,
  settingIcon,
  filterText,
  filterIcon,
  ...props
}: SmartHeaderProps) => (
  <div className={classnames(styles["smart-header_container"], extClassName)}>
    <div className={styles["smart-header_block"]}>
      <div className={styles["setting-icon"]}>{settingIcon}</div>
      <p className={styles.text}>{settingText}</p>
    </div>
    <div className={styles["smart-header_block"]}>
      <p className={styles.text}>{filterText}</p>
      <button className={styles.filterButton} type="button" {...props}>
        {filterIcon}
      </button>
    </div>
  </div>
);
