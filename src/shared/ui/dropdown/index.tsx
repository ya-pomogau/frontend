import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from 'shared/ui';
import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { Tooltip } from '../tooltip';
import { Task } from 'entities/task/types';
import { useGetTaskActiveQuery } from 'services/user-task-api';

export type Option = { _id: string; title: string };

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

  const { data: tasks } = useGetTaskActiveQuery('recipient');

  const { categories } = useAppSelector((state) => state.createRequest);

  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);

  const categoryId = tasks?.map((item: Task) => item.category._id);

  const commonIds = categories?.filter((obj) => categoryId?.includes(obj._id));

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
    const refKey = item._id.toString();
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
            {selected?.title || placeholder}
            {selected && <Icon icon="ArrowDownIcon" color={'white'} />}
          </>
        )}
      </div>
      {isActive && (
        <ul className={classNames('text', 'text_size_middle', styles.list)}>
          {items?.map((item) => {
            const itemSelect = commonIds?.find((obj) => {
              return obj._id === item._id;
            });
            const refKey = item._id.toString();
            if (!refMap.current[refKey]) {
              refMap.current[refKey] = createRef<HTMLLIElement>();
            }
            return (
              <li
                ref={itemSelect && refMap.current[refKey]}
                className={itemSelect ? styles.itemSelected : styles.item}
                key={item._id}
                onClick={() => {
                  itemSelect ? openPopup(item) : handleOnChange(item);
                }}
              >
                {item?.title}
                {selected?._id === item._id && <Icon icon="CheckIcon" color={'blue'} />}
              </li>
            );
          })}
        </ul>
      )}
      {isOpen && (
        <Tooltip
          visible
          pointerPosition={'right'}
          changeVisible={() => setIsOpen(false)}
          elementStyles={{
            position: 'absolute',
            top: `${popupPosion?.top}px`,
            right: `${popupPosion?.right}px`,
          }}
        >
          <div className={styles.closeWrapper}>
            <Icon icon="CloseCrossIcon"
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
