import { ChangeEvent } from 'react';

import { Input } from 'shared/ui';
import { BallsIcon } from 'shared/ui/icons/balls-icon';

import styles from './styles.module.css';

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
    <div className={styles.balance_box}>
      <p className={styles.balance_text}>{title}</p>
      <Input
        className={styles.balance_input}
        defaultValue={inputValue}
        name={title}
        onChange={handleChange}
        type="number"
        min="1"
        step="1"
      />
      <BallsIcon color="blue" size="46" />
    </div>
  );
};

export default BalanceSettingsItem;
