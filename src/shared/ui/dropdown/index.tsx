import { useState } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../icons/check-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon';

import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { useGetTasksByStatusQuery } from 'services/tasks-api';

export type Option = { value: string; label: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  label?: string;
  selected: Option | undefined;
  onChange: (item: Option) => void;
  extClassName?: string;
}

const Dropdown = ({
  placeholder,
  items,
  selected,
  onChange,
  label,
  extClassName,
}: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  const { data: tasks } = useGetTasksByStatusQuery('active');
  // console.log(tasks);
  const userId = useAppSelector((state) => state.user.data?.id);
  const { categories } = useAppSelector((state) => state.createRequest);
  // Фильтруем заявки по id
  const taskId = tasks.filter((item: any) => {
    if (item.recipient.id === userId) {
      return item;
    }
  });
  // Получаем id категории
  const categoryId = taskId.map((item: any) => item.category.id);
  //Получем объект уже выбранной категории
  const commonIds = categories.filter((obj: any) =>
    categoryId.includes(obj.id)
  );
  console.log(commonIds);
  const commonSelected = commonIds?.map((item: any) => ({
    value: String(item.id),
    label: item.name,
  }));

  return (
    <div className={classNames(styles.dropdown, extClassName)}>
      <div className={classNames('text', 'text_size_middle', styles.label)}>
        {label}
      </div>
      <div
        className={classNames(
          `text`,
          styles.button,
          selected ? undefined : styles.placeholder
        )}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {!isActive && (
          <>
            {selected?.label || placeholder}
            {selected && <ArrowDownIcon color={'white'} />}
          </>
        )}
      </div>
      {isActive && (
        <ul className={classNames('text', 'text_size_middle', styles.list)}>
          {items?.map((item) => (
            <li
              className={
                commonSelected?.find((obj) => {
                  return obj.value === item.value;
                })
                  ? styles.itemSelected
                  : styles.item
              }
              key={item.value}
              onClick={() => {
                onChange(item);
                setIsActive(false);
              }}
            >
              {item?.label}
              {selected?.value === item.value && <CheckIcon color={'blue'} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
