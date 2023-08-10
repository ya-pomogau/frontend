import classnames from 'classnames';
import styles from './styles.module.css';
import { ChangeEvent } from 'react';
import { Button } from 'shared/ui/button';
import BalanceSettingsItem from './components/balance-settings-item';

interface BalanceSettingsProps {
  extClassName?: string;
}

const balanceItems = [
  {
    title: 'Перевозка в личном транспорте',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Покупка вещей/техники',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Сопровождение',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Помощь в уборке',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Покупка продуктов',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Организация досуга',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Помощь в подъёме/спуске',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Ремонт техники/жилья',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Помощь в готовке',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
  {
    title: 'Срочные',
    inputValue: '1',
    onInputChange: (e: ChangeEvent<HTMLInputElement>): void => {
      throw new Error('Function not implemented.');
    },
  },
];

export const BalanceSettings = ({ extClassName }: BalanceSettingsProps) => {
  return (
    <div className={classnames(styles.container, extClassName)}>
      <div className={classnames(styles.balances_box)}>
        {balanceItems.map((item, index) => (
          <BalanceSettingsItem
            key={index}
            title={item.title}
            inputValue={item.inputValue}
            onInputChange={item.onInputChange}
          />
        ))}
      </div>
      <Button
        className={classnames(styles.save_btn)}
        buttonType={'primary'}
        label={'Сохранить'}
        size="large"
      />
    </div>
  );
};
