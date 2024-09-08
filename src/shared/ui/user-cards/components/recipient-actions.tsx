import { useState } from 'react';
import classnames from 'classnames';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import styles from '../styles.module.css';
import { useAppSelector } from '../../../../app/hooks';
import { AdminPermission } from '../../../types/common.types';
import { TextArea } from 'shared/ui/text-area';

interface RecipientActionsProps {
  viewMode?: string;
  approved: boolean;
  isUserBlocked: boolean;
  extClassName?: string;
  onConfirmClick: () => void;
  onBlockClick: () => void;
}

const RecipientActions = ({
  viewMode = 'tiles',
  approved,
  isUserBlocked,
  extClassName,
  onConfirmClick,
  onBlockClick,
}: RecipientActionsProps) => {
  const [recipientValue, setRecipientValue] = useState('');
  const adminPermissions = useAppSelector(
    (state) => state.user.data?.permissions
  );
  const approvePermission = adminPermissions?.includes(
    AdminPermission.CONFIRMATION
  );

  return (
    <div className={classnames(extClassName, styles.buttons_div)}>
      {viewMode === 'list' ? (
        <TextArea
          className={classnames(styles.recipient_textarea)}
          name="name"
          onChange={(e) => {
            setRecipientValue(e.target.value);
          }}
          placeholder="Впишите вашу фамилию"
          value={recipientValue}
        />
      ) : (
        <Input
          className={classnames(styles.recipient_input)}
          name="name"
          onChange={(e) => {
            setRecipientValue(e.target.value);
          }}
          value={recipientValue}
          placeholder="Впишите вашу фамилию"
          type="text"
        />
      )}

      <Button
        disabled={approved || !approvePermission}
        buttonType={recipientValue ? 'primary' : 'secondary'}
        label="Подтвердить"
        onClick={onConfirmClick}
      />

      <Button
        disabled={!approvePermission}
        buttonType="secondary"
        label={isUserBlocked ? 'Разблокировать' : 'Заблокировать'}
        onClick={onBlockClick}
      />
    </div>
  );
};

export default RecipientActions;
