import React, { useState, useRef } from "react";
import styles from './styles.module.css'

interface dropdownProps {
  placeholder: string;
  items: Array<string>;
}

const Dropdown = ({placeholder, items, ...props} : dropdownProps) => {
  const [ isActive, setIsActive ] = useState(false);
  const [ selected, setSelected ] = useState('');

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdownButton}
        onClick={() => {setIsActive(!isActive)}}
      >
        {placeholder === placeholder ? placeholder : selected}
      </div>

      {isActive && (
        <div
          className={styles.dropdownContent}
        >
          {items.map(item => (
            <div
              onClick={() => {
                setSelected(item)
                setIsActive(false)
              }}
            >
              {item}
            </div>
          )}
        </div>)}
    </div>
  )
}
export default Dropdown
