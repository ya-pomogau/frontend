import { useAppSelector } from "app/hooks";
import { InfoContainer } from "shared/ui/info-container";
import { InfoContainerContent } from "shared/ui/info-container-content";
import { VolunteerInfo } from "./volunteer-info/volunteer-info";
import { RecipientInfo } from "./recipient-info/recipient-info";
import { TUserRole } from "../../types";
import styles from "./styles.module.css";

interface UserInfoProps {
  roleForStoryBook?: TUserRole;
  onClickSettingsButton: () => void;
}

export const UserInfo = ({
  roleForStoryBook,
  onClickSettingsButton,
}: UserInfoProps) => {
  const user = useAppSelector((state) => state.user.data);

  return (
    user && (
      <InfoContainer
        avatarName={user.fullname}
        link={user.avatar}
        onClickSettingsButton={onClickSettingsButton}
      >
        <div className={styles.contentWrapper}>
          <InfoContainerContent name={user.fullname} />

          {user.role === 'consumer' && (
            <RecipientInfo
              tasksCount={user.tasksCount || 0}
              completedTasksCount={user.completedTasksCount || 0}
            />
          )}

          {user.role === 'volunteer' && (
            <VolunteerInfo
              score={user.score || 0}
              virtualKey={user.virtualKey}
              completedTasksCount={user.completedTasksCount || 0}
            />
          )}
        </div>
      </InfoContainer>
    )
  );
};
