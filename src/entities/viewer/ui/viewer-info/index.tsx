import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { InfoContainer } from "shared/ui/info-container";
import { InfoContainerContent } from "shared/ui/info-container-content";
import { VolunteerInfo } from "./volunteer-info/volunteer-info";
import { RecipientInfo } from "./recipient-info/recipient-info";
import { TUserRole } from "../../types";
import { setUserRole, fetchUserData } from "../../model";
import styles from "./styles.module.css";

interface ViewerInfoProps {
  roleForStoryBook?: TUserRole;
  onClickSettingsButton: () => void;
}

export const ViewerInfo = ({
  roleForStoryBook,
  onClickSettingsButton,
}: ViewerInfoProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const isRecipient = useMemo(() => user.role === "consumer", [user.role]);
  const isVolunteer = useMemo(() => user.role === "volunteer", [user.role]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [user, dispatch]);

  return (
        user.data && (
        <InfoContainer
      avatarName={user.data.name}
      link={user.data.avatarLink}
      onClickSettingsButton={onClickSettingsButton}
    >
      <div className={styles.contentWrapper}>
        <InfoContainerContent name={user.data.name} />

        {isRecipient && (
          <RecipientInfo
            tasksCount={user.data.tasksCount || 0}
            completedTasksCount={user.data.completedTasksCount || 0}
          />
        )}
        {isVolunteer && (
          <VolunteerInfo
            score={user.data.score || 0}
            virtualKey={user.data.virtualKey}
            completedTasksCount={user.data.completedTasksCount || 0}
          />
        )}
      </div>
    </InfoContainer>
      )
  );
};
