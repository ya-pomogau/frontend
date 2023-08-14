import React from 'react';
import classnames from 'classnames';
import { ExclamationPointIcon } from 'shared/ui/icons/exclamation-point-icon';
import { Button } from 'shared/ui/button';
import styles from '../styles.module.css';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';

interface VolunteerActionsProps {
  isVolonteerAcceptButtonDisabled: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
  scores: number;
  keys: boolean;
  isAcceptButtonExclamationPointIcon: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  onAcceptButtonClick: () => void;
  onBlockButtonClick: () => void;
  onGiveKeysButtonClick: () => void;
}

const VolunteerActions: React.FC<VolunteerActionsProps> = ({
  isVolonteerAcceptButtonDisabled,
  getButtonTypeFromScore,
  scores,
  isAcceptButtonExclamationPointIcon,
  isKeyButtonExclamationPointIcon,
  onAcceptButtonClick,
  onBlockButtonClick,
  onGiveKeysButtonClick,
  keys,
}: VolunteerActionsProps) => {
  const isKeysNullOrOne = keys ? 1 : null;

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
          disabled={isVolonteerAcceptButtonDisabled}
          buttonType={getButtonTypeFromScore(scores)}
          label="Подтвердить"
          onClick={onAcceptButtonClick}
        />
        {isAcceptButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
      <Button
        buttonType="secondary"
        label="Заблокировать"
        onClick={onBlockButtonClick}
      />
      <div className={classnames(styles.exclamation_point_div)}>
        <Button
          buttonType="secondary"
          label="Дать ключи"
          onClick={onGiveKeysButtonClick}
        />
        {isKeyButtonExclamationPointIcon && <ExclamationPointIcon />}
      </div>
    </div>
  );
};

export default VolunteerActions;
