import classnames from 'classnames';

import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

import styles from '../styles.module.css';
import { useAppSelector } from '../../../../app/hooks';
import { AdminPermission } from '../../../types/common.types';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
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
  getButtonTypeFromScore,
  score,
  extClassName,
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
    AdminPermission.CONFIRMATION
  );
  const keysPermission = adminPermissions?.includes(AdminPermission.KEYS);
// Log the button state for debugging purposes
// console.log('Approve Permission:', approvePermission);
// console.log('isVolonteerAcceptButtonDisabled:', isVolonteerAcceptButtonDisabled);
// console.log('Score:',);

  // Determine if the "Дать ключи" button should be disabled
  const isGiveKeysButtonDisabled = score < 60 || keysPermission;
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
        { isAcceptButtonExclamationPointIcon && <ExclamationPointIcon /> }
      </div>
      <Button
        disabled={!approvePermission}
        buttonType="secondary"
        label="Забло"
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
