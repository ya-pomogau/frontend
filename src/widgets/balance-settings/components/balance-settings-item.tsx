import { ChangeEvent } from 'react';
import classnames from 'classnames';

import { Input } from '../../../shared/ui/input';
import { BallsIcon } from '../../../shared/ui/icons/balls-icon';

import styles from '../styles.module.css';

interface BalanceSettingsItemProps {
  title: string;
  inputValue: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BalanceSettingsItem = ({
  title,
  inputValue,
  handleChange,
}: BalanceSettingsItemProps) => {
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
