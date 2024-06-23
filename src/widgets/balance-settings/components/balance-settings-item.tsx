import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import styles from '../styles.module.css';
import { Input } from '../../../shared/ui/input';
import { BallsIcon } from '../../../shared/ui/icons/balls-icon';

interface BalanceSettingsItemProps {
  title: string;
  inputValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BalanceSettingsItem: React.FC<BalanceSettingsItemProps> = ({
  title,
  inputValue,
  handleChange,
}) => {
  return (
    <div className={classnames(styles.balance_box)}>
      <div>
        <p
          className={classnames(
            styles.balance_text,
            'text',
            'text_size_medium',
            'm-0',
            'p-0'
          )}
        >
          {title}
        </p>
      </div>
      <div className={classnames(styles.balance_input_box)}>
        <Input
          className={classnames(styles.balance_input)}
          value={inputValue}
          name={title}
          onChange={handleChange}
          type="number"
          min="1"
          step="1"
        />
      </div>
      <BallsIcon color={'blue'} size={'46'} />
    </div>
  );
};

export default BalanceSettingsItem;
