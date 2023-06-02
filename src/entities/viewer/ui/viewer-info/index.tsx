import { useEffect, useMemo } from "react";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { InfoContainer } from "shared/ui/info-container";
import { InfoContainerContent } from "shared/ui/info-container-content";
import { VolunteerInfo } from "./volunteer-info/volunteer-info";
import { RecipientInfo } from "./recipient-info/recipient-info";
import { TRole } from "../../types";
import { updateUserRole } from "../../model";
import styles from "./styles.module.css";

interface ViewerInfoProps {
  roleForStoryBook?: TRole;
}

export const ViewerInfo = ({ roleForStoryBook }: ViewerInfoProps) => {
  const dispatch = useDispatch();
  const {
    name,
    avatarLink,
    role,
    score = 0,
    virtualKey,
    completedTasksCount = 0,
    tasksCount = 0,
    ...otherInfo
  } = useSelector((state: RootState) => state.viewer.viewerInfo);

  const isRecipient = useMemo(() => role === "recipient", [role]);
  const isVolunteer = useMemo(() => role === "volunteer", [role]);

  useEffect(() => {
    if (roleForStoryBook) {
      dispatch(updateUserRole(roleForStoryBook));
    }
  }, [dispatch, roleForStoryBook]);

  return (
    <InfoContainer avatarName={name} link={avatarLink}>
      <div className={styles.contentWrapper}>
        <InfoContainerContent {...otherInfo} name={name} />
        {(isRecipient || isVolunteer) && (
          <div className={styles.additionalInfoWrapper}>
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
        )}
      </div>
    </InfoContainer>
  );
};
