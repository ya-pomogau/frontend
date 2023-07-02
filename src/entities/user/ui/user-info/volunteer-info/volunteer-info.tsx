import classnames from "classnames";
import { BallsIcon } from "shared/ui/icons/balls-icon";
import { KeyIcon } from "shared/ui/icons/key-icon";
import { FinishedApplicationIcon } from "shared/ui/icons/finished-application-icon";
import styles from "../styles.module.css";

interface VolunteerInfoProps {
  score: number;
  virtualKey?: boolean;
  completedTasksCount: number;
}

export const VolunteerInfo = ({
  score,
  virtualKey,
  completedTasksCount,
}: VolunteerInfoProps) => (
  <div className={styles.volunteerInfo}>
    <div className={styles.dataWrapper}>
      <BallsIcon size="32" color="blue" />
      <span className={classnames("text", "text_size_small", styles.count)}>
        {score}
      </span>
    </div>
    <div className={styles.dataWrapper}>
      <KeyIcon size="24" color="blue" />
      <span className={classnames("text", "text_size_small", styles.count)}>
        {virtualKey ? "1" : "0"}
      </span>
    </div>

    <div className={styles.dataWrapper}>
      <FinishedApplicationIcon size="24" color="blue" />
      <span className={classnames("text", "text_size_small", styles.count)}>
        {completedTasksCount}
      </span>
    </div>
  </div>
);
