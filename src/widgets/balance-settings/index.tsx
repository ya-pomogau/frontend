import classnames from 'classnames';
import styles from './styles.module.css';
import { CardButton } from 'shared/ui/card-button';
import { Icon } from 'shared/ui/icons';
import { SettingsIcon } from 'shared/ui/icons/settings-icon';
import { Input } from 'shared/ui/input';
import { ChangeEvent } from 'react';
import { BallsIcon } from 'shared/ui/icons/balls-icon';

interface BalanceSettingsProps {
  extClassName?: string;
  settingText: string;
}

export const BalanceSettings = ({
  extClassName,
  settingText,
}: BalanceSettingsProps) => {
  if (settingText.length === 0) {
    return null;
  }

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
              Перевозка в личном транспорте
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Покупка вещей/техники
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Сопровождение
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Помощь в уборке
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Покупка продуктов
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Организация досуга
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Помощь в подъёме/спуске
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Ремонт техники/жилья
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Помощь в готовке
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>

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
              Срочные
            </p>
          </div>
          <div>
            <Input
              className={classnames(styles.balance_input)}
              value={'1'}
              name={'text'}
              onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              }}
            ></Input>
          </div>
          <BallsIcon color={'blue'} size={'32'} />
        </div>
      </div>
    </div>
  );
};
