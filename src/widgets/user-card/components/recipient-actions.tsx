import { useState } from 'react';
import classnames from 'classnames';

import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from '../styles.module.css';
import { useAppSelector } from '../../../app/hooks';
import { AdminPermission } from '../../../shared/types/common.types';

interface RecipientActionsProps {
  approved: boolean;
  onConfirmClick: () => void;
  onBlockClick: () => void;
}

const RecipientActions = ({
  approved,
  onConfirmClick,
  onBlockClick,
}: RecipientActionsProps) => {
  const [recipientInputValue, setRecipientInputValue] = useState('');
  const adminPermissions = useAppSelector(
    (state) => state.user.data?.permissions
  );
  const approvePermission = adminPermissions?.some(
    (per) => per === AdminPermission.CONFIRMATION
  );

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
        disabled={approved || !approvePermission}
        buttonType={recipientInputValue ? 'primary' : 'secondary'}
        label="Подтвердить"
        onClick={onConfirmClick}
      />

      <Button
        disabled={!approvePermission}
        buttonType="secondary"
        label="Заблокировать"
        onClick={onBlockClick}
      />
    </div>
  );
};

export default RecipientActions;
