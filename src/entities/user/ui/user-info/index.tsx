import { useAppSelector } from "app/hooks";
import { InfoContainer } from "shared/ui/info-container";
import { InfoContainerContent } from "shared/ui/info-container-content";
import { VolunteerInfo } from "./volunteer-info/volunteer-info";
import { RecipientInfo } from "./recipient-info/recipient-info";
import type { UserRole } from "../../types";

import styles from "./styles.module.css";

interface UserInfoProps {
  roleForStoryBook?: UserRole;
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
          <InfoContainerContent 
            id={user.id}
            name={user.fullname}
            phone={user.phone}
            address={user.address}
          />

          {user.role === 'recipient' && (
            <RecipientInfo
              tasksCount={0}
              completedTasksCount={0}
            />
          )}

          {user.role === 'volunteer' && (
            <VolunteerInfo
              score={user.scores || 0}
              hasKey={user.keys}
            />
          )}
        </div>
      </InfoContainer>
    )
  );
};
