import { DetailedHTMLProps, InputHTMLAttributes, MouseEvent } from 'react';
import cn from 'classnames';

import { Icon } from 'shared/ui';

import styles from './styles.module.css';
import { Typography } from 'shared/ui/typography';

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
        <Typography
          tag={'h2'}
          fontFamily={'primaryFont'}
          color={'primary-additional'}
          variant={'title'}
          content={label}
        />
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
            <Typography
              tag={'p'}
              fontFamily={'primaryFont'}
              variant={'support'}
              color={'primary'}
              content={editText}
            />
          </div>
          <Typography
            tag={'span'}
            fontFamily={'primaryFont'}
            variant={'support'}
            color={'orange'}
            content={errorText ? errorText : ''}
            extraClass={errorTextStyles}
          />
        </>
      )}
    </div>
  );
};
