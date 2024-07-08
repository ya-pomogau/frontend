import classnames from 'classnames';

import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

import styles from '../styles.module.css';
import { useAppSelector } from '../../../app/hooks';
import { AdminPermission } from '../../../shared/types/common.types';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
  score: number;
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
  isAcceptButtonExclamationPointIcon,
  isKeyButtonExclamationPointIcon,
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
    AdminPermission.CONFIRMATION
  );
  const keysPermission = adminPermissions?.includes(AdminPermission.KEYS);

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
          buttonType={getButtonTypeFromScore(score)}
          label="Подтвердить"
          onClick={onAcceptButtonClick}
        />
        {/* {isAcceptButtonExclamationPointIcon && <ExclamationPointIcon />} */}
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
          disabled={!keysPermission}
        />
        {isKeyButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
    </div>
  );
};

export default VolunteerActions;
