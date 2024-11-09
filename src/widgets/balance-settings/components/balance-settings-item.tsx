import { ChangeEvent } from 'react';

import { Input, Icon, Typography } from 'shared/ui';

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
      <Typography content={title} />
      <Input
        className={styles.balance_input}
        defaultValue={inputValue}
        name={title}
        onChange={handleChange}
        type="number"
        min="1"
        step="1"
      />
      <Icon icon="BallsIcon" color="blue" size="46" />
    </div>
  );
};

export default BalanceSettingsItem;
