import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { ReactElement } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';
import { Icon } from '../icons';

interface PopupInputWrapper {
  placeholder: string;
  inputValue: string;
  name: string;
  extClassInput?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customIcon?: ReactElement;
  onClickBtn: () => void;
  extClassButton?: string;
}

export function InputWrapper({
  placeholder,
  inputValue,
  name,
  extClassInput,
  onChange,
  customIcon,
  onClickBtn,
  extClassButton,
}: PopupInputWrapper) {
  return (
    <article className={styles.inputWrapper}>
      <Input
        placeholder={placeholder}
        value={inputValue}
        name={name}
        extClassName={cn(styles.input, extClassInput)}
        onChange={onChange}
        customIcon={customIcon}
      />
      <Button
        buttonType="primary"
        customIcon={<Icon color="white" icon="SendIcon" />}
        size="small"
        onClick={onClickBtn}
        extClassName={cn(styles.button, extClassButton)}
        disabled={!inputValue}
      />
    </article>
  );
}
