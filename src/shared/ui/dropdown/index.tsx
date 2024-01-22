import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../icons/check-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon';

import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import { Tooltip } from '../tooltip';

export type Option = { value: string; label: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  label?: string;
  selected: Option | undefined;
  onChange: (item: Option) => void;
  extClassName?: string;
  popupOpen?: any;
  refLi?: any;
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
  popupOpen,
  refLi,
}: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const commonSelected = commonIds?.map((item: any) => ({
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
  // console.log(refMap);
  useEffect(() => {
    refMap.current = {}; // Сброс объекта при каждом монтировании
  }, []);

  const popupOpened = (item: Option) => {
    const refKey = item.value.toString();
    const boundingClientRect =
      refMap.current[refKey]?.current?.getBoundingClientRect();
    if (boundingClientRect) {
      setPopupPosion({
        right: window.innerWidth - boundingClientRect.right,
        top: boundingClientRect.top + boundingClientRect.height,
      });
    }
    // if (!isOpen) {
    //   popupOpened(item);
    // }
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    window.addEventListener('resize', () => setIsOpen(false));

    return () => {
      window.removeEventListener('resize', () => setIsOpen(false));
    };
  }, []);
  // useEffect(() => {
  //   const handleResize = () => {
  //     commonSelected.forEach((item) => {
  //       popupOpened(item);
  //     });
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [isOpen]);
  // useEffect(() => {
  //   commonSelected.map((item: Option) => {
  //     window.addEventListener('resize', () => popupOpened(item));
  //   });

  //   return () => {
  //     commonSelected.map((item: Option) => {
  //       window.removeEventListener('resize', () => popupOpened(item));
  //     });
  //   };
  // }, []);
  // const getCoords = () => {
  //   console.log(refMap);
  //   console.log(window.innerHeight);
  //   const box = refMap.current?.getBoundingClientRect();
  //   console.log(box);
  //   if (box) {
  //     setPopupPosion({
  //       right: window.innerWidth - box.right,
  //       top: box.top + box.height,
  //     });
  //   }
  // };

  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);
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
            console.log(itemSelect);
            console.log(refMap.current[refKey]);
            return (
              <li
                ref={itemSelect && refMap.current[refKey]}
                className={itemSelect ? styles.itemSelected : styles.item}
                key={item.value}
                onClick={() => {
                  itemSelect ? popupOpened(item) : handleOnChange(item);
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
          Здесь будет текст
        </Tooltip>
      )}
    </div>
  );
};

export default Dropdown;
