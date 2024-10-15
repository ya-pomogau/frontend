import classnames from 'classnames';

import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

import styles from './styles.module.css';
import { useAppSelector } from '../../../../app/hooks';
import {
  UserStatus,
  adminPermission,
} from '../../../../shared/types/common.types';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
  getButtonTypeFromScore: (
    score: number,
    status?: UserStatus
  ) => 'primary' | 'partial' | 'secondary';
  score: number;
  status: UserStatus;
  keys: boolean;
  isAcceptButtonExclamationPointIcon: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  onAcceptButtonClick: () => void;
  onBlockButtonClick: () => void;
  onGiveKeysButtonClick: () => void;
}

const VolunteerActions = ({
  isVolonteerAcceptButtonDisabled,
  getButtonTypeFromScore,
  score,
  status,
  isKeyButtonExclamationPointIcon,
  isAcceptButtonExclamationPointIcon,
  onAcceptButtonClick,
  onBlockButtonClick,
  onGiveKeysButtonClick,
  keys,
}: VolunteerActionsProps) => {
  const isKeysNullOrOne = keys ? true : false;
  const adminPermissions = useAppSelector(
    (state) => state.user.data?.permissions
  );
  const approvePermission = adminPermissions?.includes(
    adminPermission.CONFIRMATION
  );
  const keysPermission = adminPermissions?.includes(adminPermission.KEYS);
  const isGiveKeysButtonDisabled = score < 60 || keysPermission;

  return (
    <div className={classnames(styles.buttons_div)}>
      <div className={classnames(styles.volunteer_info)}>
        <VolunteerInfo
          extClassName={styles.customVolunteerInfo}
          score={score}
          hasKey={isKeysNullOrOne}
        />
      </div>
      <div className={classnames(styles.exclamation_point_div)}>
        <Button
          disabled={isVolonteerAcceptButtonDisabled || !approvePermission}
          buttonType={getButtonTypeFromScore(score, status)}
          label="Подтвердить"
          onClick={onAcceptButtonClick}
        />
        {isAcceptButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
      <Button
        disabled={!approvePermission}
        buttonType="secondary"
        label="Заблокировать"
        onClick={onBlockButtonClick}
      />
      <div className={classnames(styles.exclamation_point_div)}>
        <Button
          buttonType="secondary"
          label="Дать ключи"
          onClick={onGiveKeysButtonClick}
          disabled={isGiveKeysButtonDisabled}
        />
        {isKeyButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
    </div>
  );
};

export default VolunteerActions;