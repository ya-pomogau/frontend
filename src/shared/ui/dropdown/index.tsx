import { useState } from 'react';
import styles from './styles.module.css';
import { CheckIcon } from '../icons/check-icon';

export type Option = { id: number; title: string };

interface IDropdownProps {
  placeholder: string;
  items: Array<Option>;
  onChange: (item: Option) => void;
}

const Dropdown = ({ placeholder, items }: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    id: 0,
    title: placeholder,
  });

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.button}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {selectedValue.title}
        {selectedValue.title !== placeholder && <CheckIcon color={'blue'} />}
      </div>

      {isActive && (
        <ul className={styles.content}>
          {items.map((item) => (
            <li
              className={styles.item}
              key={item.id}
              onClick={() => {
                setSelectedValue(item);
                setIsActive(false);
              }}
            >
              {item.title}
              {selectedValue?.id === item.id && <CheckIcon color={'blue'} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
