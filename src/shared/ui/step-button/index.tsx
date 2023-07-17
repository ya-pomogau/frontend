import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

type TIconArrow = {
  direction: 'right' | 'left';
  extClassName?: string;
};

const IconArrow = ({ direction, extClassName }: TIconArrow) => (
  <svg
    className={extClassName}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="#929EAD"
    xmlns="http://www.w3.org/2000/svg"
  >
    {direction === 'right' ? (
      <path d="M8.83984 7.41L13.4198 12L8.83984 16.59L10.2498 18L16.2498 12L10.2498 6L8.83984 7.41Z" />
    ) : null}

    {direction === 'left' ? (
      <path d="M15.1602 7.41L10.5802 12L15.1602 16.59L13.7502 18L7.75016 12L13.7502 6L15.1602 7.41Z" />
    ) : null}
  </svg>
);

type TStepButton = {
  type: 'button' | 'submit' | 'reset';
  direction: 'right' | 'left';
  buttonClassName?: string;
  iconClassName?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const StepButton = ({
  type = 'button',
  direction,
  buttonClassName,
  iconClassName,
  ...props
}: TStepButton) => (
  <button className={cn(styles.button, buttonClassName)} {...props} type={type}>
    <IconArrow
      direction={direction}
      extClassName={cn(styles.button__icon, iconClassName)}
    />
  </button>
);
