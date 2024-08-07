import { DetailedHTMLProps, InputHTMLAttributes, MouseEvent } from 'react';
import cn from 'classnames';

import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface ContactInputProps extends InputProps {
  isEditAllowed: boolean;
  isEditable: boolean;
  label: string;
  editText: string;
  onEdit: () => void;
  errorText?: string;
}

export const ContactInput = ({
  value,
  name,
  type,
  label,
  isEditAllowed,
  isEditable,
  onChange,
  onEdit,
  editText,
  errorText,
}: ContactInputProps) => {
  const formStyles = `text text_type_regular m-0`;
  const titleStyles = `${styles.title} ${formStyles}`;
  const editTextStyles = `${formStyles} text_size_small`;
  interface IErrorStyle {
    color: string;
    marginTop: number;
    minHeight: number;
    fontSize: number;
  }
  const errorStyle: IErrorStyle = {
    color: 'orange',
    marginTop: 8,
    minHeight: 16,
    fontSize: 14,
  };

  const inputStyles = cn(styles.input, {
    [styles.input_mode_edit]: isEditable,
    [styles.input_mode_link]: !isEditable,
  });
  const errorTextStyles = cn({
    [styles.edit_box_hidden]: !isEditable,
  });

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    window.location.href = type === 'email' ? `mailto:${value}` : `${value}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.element_box}>
        <h2 className={titleStyles}>{label}</h2>
        <input
          type={type}
          name={name}
          className={inputStyles}
          onChange={onChange}
          value={value || ''}
          readOnly={!isEditable}
          onClick={!isEditable ? handleClick : undefined}
        />
      </div>
      {isEditAllowed && (
        <>
          <div
            onClick={onEdit}
            className={isEditable ? styles.edit_box_hidden : styles.edit_box}
          >
            <Icon color="blue" icon="EditIcon" />
            <p className={editTextStyles}>{editText}</p>
          </div>
          <span className={errorTextStyles} style={errorStyle}>
            {errorText === ' ' ? <span>&nbsp;</span> : errorText}
          </span>
        </>
      )}
    </div>
  );
};
