import classnames from 'classnames';
import styles from './styles.module.css';
import { ChangeEvent, useState } from 'react';
import { Button } from 'shared/ui/button';
import BalanceSettingsItem from './components/balance-settings-item';

interface BalanceSettingsProps {
  extClassName?: string;
}

export const BalanceSettings = ({ extClassName }: BalanceSettingsProps) => {
  const [balanceItems, setBalanceItems] = useState([
    {
      title: 'Перевозка в личном транспорте',
      inputValue: '1',
    },
    {
      title: 'Покупка вещей/техники',
      inputValue: '1',
    },
    {
      title: 'Сопровождение',
      inputValue: '1',
    },
    {
      title: 'Помощь в уборке',
      inputValue: '1',
    },
    {
      title: 'Покупка продуктов',
      inputValue: '1',
    },
    {
      title: 'Организация досуга',
      inputValue: '1',
    },
    {
      title: 'Помощь в подъёме/спуске',
      inputValue: '1',
    },
    {
      title: 'Ремонт техники/жилья',
      inputValue: '1',
    },
    {
      title: 'Помощь в готовке',
      inputValue: '1',
    },
    {
      title: 'Срочные',
      inputValue: '1',
    },
  ]);

  const handleInputChange = (index: number, value: string) => {
    const updatedItems = [...balanceItems];
    updatedItems[index].inputValue = value;
    setBalanceItems(updatedItems);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className={classnames(styles.container, extClassName)}>
      <form onSubmit={handleSubmit}>
        <div className={classnames(styles.balances_box)}>
          {balanceItems.map((item, index) => (
            <BalanceSettingsItem
              key={index}
              title={item.title}
              inputValue={item.inputValue}
              onInputChange={(value: string) => handleInputChange(index, value)}
            />
          ))}
        </div>
        <Button
          className={classnames(styles.save_btn)}
          buttonType={'primary'}
          label={'Сохранить'}
          size="large"
          actionType="submit"
          onClick={() => console.log('Save button pressed')}
          onSubmit={() => console.log('Submit')}
        />
      </form>
    </div>
  );
};
