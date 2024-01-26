import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../icons/check-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon';

import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import { Tooltip } from '../tooltip';
import { Task } from 'entities/task/types';

export type Option = { value: string; label: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  label?: string;
  selected: Option | undefined;
  onChange: (item: Option) => void;
  extClassName?: string;
}
interface Coords {
  right: number;
  top: number;
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
  const [isOpen, setIsOpen] = useState(false);

  const { data: tasks } = useGetTasksByStatusQuery('active');

  const userId = useAppSelector((state) => state.user.data?.id);
  const { categories } = useAppSelector((state) => state.createRequest);
  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);
  // Фильтруем заявки по id

  const taskId = tasks.filter((item: Task) => {
    if (item.recipient.id === userId) {
      return item;
    }
  });
  // Получаем id категории
  const categoryId = taskId.map((item: Task) => item.category.id);
  //Получем объект уже выбранной категории
  const commonIds = categories.filter((obj) => categoryId.includes(obj.id));

  const commonSelected = commonIds?.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));

  const handleOnChange = useCallback(
    (item: Option) => {
      onChange(item);
      setIsActive(false);
    },
    [onChange, setIsActive]
  );

  const refMap = useRef<{
    [key: string]: React.MutableRefObject<HTMLLIElement | null>;
  }>({});

  useEffect(() => {
    refMap.current = {}; // Сброс объекта при каждом монтировании
  }, []);

  const openPopup = (item: Option) => {
    const refKey = item.value.toString();
    const boundingClientRect =
      refMap.current[refKey]?.current?.getBoundingClientRect();
    if (boundingClientRect) {
      setPopupPosion({
        right: window.innerWidth - boundingClientRect.right,
        top: boundingClientRect.top + boundingClientRect.height,
      });
    }
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    window.addEventListener('resize', () => setIsOpen(false));

    return () => {
      window.removeEventListener('resize', () => setIsOpen(false));
    };
  }, []);

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
          {items?.map((item) => {
            const itemSelect = commonSelected?.find((obj) => {
              return obj.value === item.value;
            });
            const refKey = item.value.toString();
            if (!refMap.current[refKey]) {
              refMap.current[refKey] = React.createRef<HTMLLIElement>();
            }

            return (
              <li
                ref={itemSelect && refMap.current[refKey]}
                className={itemSelect ? styles.itemSelected : styles.item}
                key={item.value}
                onClick={() => {
                  itemSelect ? openPopup(item) : handleOnChange(item);
                }}
              >
                {item?.label}
                {selected?.value === item.value && <CheckIcon color={'blue'} />}
              </li>
            );
          })}
        </ul>
      )}
      {isOpen && (
        <Tooltip
          visible
          pointerPosition={'center'}
          changeVisible={() => setIsOpen(false)}
          elementStyles={{
            position: 'absolute',
            top: `${popupPosion?.top}px`,
            right: `${popupPosion?.right}px`,
          }}
        >
          <div className={styles.closeWrapper}>
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className={styles.text}>
            Такая заявка уже существует. Дождитесь ее выполнения.
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Dropdown;
