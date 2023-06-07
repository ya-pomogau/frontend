import { useEffect, useMemo } from "react";
import { RootState } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { InfoContainer } from "shared/ui/info-container";
import { InfoContainerContent } from "shared/ui/info-container-content";
import { VolunteerInfo } from "./volunteer-info/volunteer-info";
import { RecipientInfo } from "./recipient-info/recipient-info";
import { TRole } from "../../types";
import { updateUserRole } from "../../model";
import styles from "./styles.module.css";

interface ViewerInfoProps {
  roleForStoryBook?: TRole;
  onClickSettingsButton: () => void;
}

export const ViewerInfo = ({
  roleForStoryBook,
  onClickSettingsButton,
}: ViewerInfoProps) => {
  const dispatch = useAppDispatch();
  const {
    name,
    avatarLink,
    role,
    score = 0,
    virtualKey,
    completedTasksCount = 0,
    tasksCount = 0,
    ...otherInfo
  } = useAppSelector((state: RootState) => state.viewer);

  const isRecipient = useMemo(() => role === "consumer", [role]);
  const isVolunteer = useMemo(() => role === "volunteer", [role]);

  useEffect(() => {
    if (roleForStoryBook) {
      dispatch(updateUserRole(roleForStoryBook));
    }
  }, [dispatch, roleForStoryBook]);

  return (
    <InfoContainer
      avatarName={name}
      link={avatarLink}
      onClickSettingsButton={onClickSettingsButton}
    >
      <div className={styles.contentWrapper}>
        <InfoContainerContent {...otherInfo} name={name} />

        {isRecipient && (
          <RecipientInfo
            tasksCount={tasksCount}
            completedTasksCount={completedTasksCount}
          />
        )}
        {isVolunteer && (
          <VolunteerInfo
            score={score}
            virtualKey={virtualKey}
            completedTasksCount={completedTasksCount}
          />
        )}
      </div>
    </InfoContainer>
  );
};
