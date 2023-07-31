import { useState } from 'react';
import styles from './styles.module.css';
import { CheckIcon } from '../icons/check-icon';

export type Option = { id: number; title: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  selected: Option | undefined;
  onChange: (item: Option) => void;
}

const Dropdown = ({
  placeholder,
  items,
  selected,
  onChange,
}: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.button}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {selected?.title ?? placeholder}
        {selected && <CheckIcon color={'blue'} />}
      </div>

      {isActive && (
        <ul className={styles.content}>
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
