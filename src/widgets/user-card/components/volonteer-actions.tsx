import classnames from 'classnames';

import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

import styles from '../styles.module.css';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
  scores: number;
  keys: boolean;
  isAdminHavePermissionSetKeys: boolean;
  isAdminHavePermissionApprove: boolean;
  isAcceptButtonExclamationPointIcon: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  onAcceptButtonClick: () => void;
  onBlockButtonClick: () => void;
  onGiveKeysButtonClick: () => void;
}

const VolunteerActions = ({
  isVolonteerAcceptButtonDisabled,
  getButtonTypeFromScore,
  scores,
  isAcceptButtonExclamationPointIcon,
  isKeyButtonExclamationPointIcon,
  onAcceptButtonClick,
  onBlockButtonClick,
  onGiveKeysButtonClick,
  keys,
  isAdminHavePermissionSetKeys,
  isAdminHavePermissionApprove,
}: VolunteerActionsProps) => {
  const isKeysNullOrOne = keys ? true : false;

  return (
    <div className={classnames(styles.buttons_div)}>
      <div className={classnames(styles.volunteer_info)}>
        <VolunteerInfo
          extClassName={styles.customVolunteerInfo}
          score={scores}
          hasKey={isKeysNullOrOne}
        />
      </div>
      <div className={classnames(styles.exclamation_point_div)}>
        <Button
          disabled={
            isVolonteerAcceptButtonDisabled || !isAdminHavePermissionApprove
          }
          buttonType={getButtonTypeFromScore(scores)}
          label="Подтвердить"
          onClick={onAcceptButtonClick}
        />
        {isAcceptButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
      <Button
        disabled={!isAdminHavePermissionApprove}
        buttonType="secondary"
        label="Заблокировать"
        onClick={onBlockButtonClick}
      />
      <div className={classnames(styles.exclamation_point_div)}>
        <Button
          buttonType="secondary"
          label="Дать ключи"
          onClick={onGiveKeysButtonClick}
          disabled={!isAdminHavePermissionSetKeys}
        />
        {isKeyButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
    </div>
  );
};

export default VolunteerActions;
