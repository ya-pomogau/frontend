import classnames from 'classnames';

import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

import styles from '../styles.module.css';
import { useAppSelector } from '../../../../app/hooks';
import { adminPermission } from '../../../types/common.types';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
  isUserBlocked: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
  score: number;
  extClassName?: string;
  keys: boolean;
  isAcceptButtonExclamationPointIcon: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  onAcceptButtonClick: () => void;
  onBlockButtonClick: () => void;
  onGiveKeysButtonClick: () => void;
}

const VolunteerActions = ({
  isVolonteerAcceptButtonDisabled,
  isUserBlocked,
  getButtonTypeFromScore,
  score,
  extClassName,
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
    adminPermission.CONFIRMATION
  );
  const keysPermission = adminPermissions?.includes(adminPermission.KEYS);

  return (
    <div className={classnames(extClassName, styles.buttons_div)}>
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
        label={isUserBlocked ? 'Разблокировать' : 'Заблокировать'}
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
