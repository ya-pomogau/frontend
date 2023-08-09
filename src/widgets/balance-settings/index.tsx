import classnames from 'classnames';
import styles from './styles.module.css';
import { SettingsIcon } from 'shared/ui/icons/settings-icon';
import { ChangeEvent } from 'react';
import { Button } from 'shared/ui/button';
import BalanceSettingsItem from './components/balance-settings-item';

interface BalanceSettingsProps {
  extClassName?: string;
  settingText: string;
}

export const BalanceSettings = ({ extClassName }: BalanceSettingsProps) => {
  return (
    <div className={classnames(styles.container, extClassName)}>
      <div className={classnames(styles.header_box)}>
        <SettingsIcon color={'blue'} size="46" />
        <p
          className={classnames(
            styles.headerText,
            'text',
            'text_size_large',
            'm-0',
            'p-0'
          )}
        >
          Настройка балов
        </p>
      </div>

      <div className={classnames(styles.balances_box)}>
        <BalanceSettingsItem
          title="Перевозка в личном транспорте"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Покупка вещей/техники"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Сопровождение"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Помощь в уборке"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Покупка продуктов"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Организация досуга"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Помощь в подъёме/спуске"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Ремонт техники/жилья"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Помощь в готовке"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
        <BalanceSettingsItem
          title="Срочные"
          inputValue="1"
          onInputChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
        />
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
