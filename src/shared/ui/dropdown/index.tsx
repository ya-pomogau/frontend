import { useState } from 'react';
import styles from './styles.module.css';

interface IDropdownProps {
  placeholder: string;
  items: Array<string>;
}

const Dropdown = ({ placeholder, items }: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(placeholder);

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.button}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {selected}
      </div>

      {isActive && (
        <div className={styles.content}>
          {items.map((item, key) => (
            <div
              className={styles.item}
              key={key}
              onClick={() => {
                setSelected(item);
                setIsActive(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
