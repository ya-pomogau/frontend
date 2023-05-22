import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css"

interface SmartHeaderProps {
    extClassName?: string;
    settingText?: string;
    settingIcon?: React.ReactNode;
    filterText?: string
    filterIcon?: React.ReactNode;
    onClick?: () => void;
    }
export const SmartHeader=({extClassName, settingText, settingIcon, filterText, filterIcon, ...props}:SmartHeaderProps) => (
            <div      className={classnames(
                styles["smart-header_container"],
                extClassName
            )}>
                <div className={styles.container}>
                    <div className={styles["setting-icon"]}>{settingIcon}</div>
                    <p className={styles.text}>{settingText}</p>
                </div>
                <div className={styles.container}>
                    <p className={styles.text}>{filterText}</p>
                    <button className={styles.button} type="button" {...props}>{filterIcon}</button>
                </div>
            </div>
);