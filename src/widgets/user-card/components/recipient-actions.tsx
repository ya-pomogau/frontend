import { useState } from 'react';
import classnames from 'classnames';

import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from '../styles.module.css';

interface RecipientActionsProps {
  approved: boolean;
  isAdminHavePermissionApprove: boolean;
  onConfirmClick: () => void;
  onBlockClick: () => void;
}

const RecipientActions = ({
  approved,
  isAdminHavePermissionApprove,
  onConfirmClick,
  onBlockClick,
}: RecipientActionsProps) => {
  const [recipientInputValue, setRecipientInputValue] = useState('');

  return (
    <div className={classnames(styles.buttons_div)}>
      <Input
        className={classnames(styles.recipient_input)}
        name="name"
        onChange={(e) => {
          setRecipientInputValue(e.target.value);
        }}
        value={recipientInputValue}
        placeholder="Впишите вашу фамилию"
        type="text"
      />

      <Button
        disabled={approved || !isAdminHavePermissionApprove}
        buttonType={recipientInputValue ? 'primary' : 'secondary'}
        label="Подтвердить"
        onClick={onConfirmClick}
      />

      <Button
        disabled={!isAdminHavePermissionApprove}
        buttonType="secondary"
        label="Заблокировать"
        onClick={onBlockClick}
      />
    </div>
  );
};

export default RecipientActions;
