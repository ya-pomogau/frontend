import classNames from 'classnames';

import { useState } from 'react';
import styles from './styles.module.css';
import { CheckIcon } from '../icons/check-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon';

export type Option = { id: number; title: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  label?: string;
  selected: Option | undefined;
  onChange: (item: Option) => void;
}

const Dropdown = ({
  placeholder,
  items,
  selected,
  onChange,
  label,
}: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div className={classNames('text', styles.label)}>{label}</div>
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
            {selected && <ArrowDownIcon color={'white'} />}
          </>
        )}
      </div>
      {isActive && (
        <ul className={classNames('text', 'text_size_middle', styles.content)}>
          {items.map((item) => (
            <li
              className={styles.item}
              key={item.id}
              onClick={() => {
                onChange(item);
                setIsActive(false);
              }}
            >
              {item.title}
              {selected?.id === item.id && <CheckIcon color={'blue'} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
