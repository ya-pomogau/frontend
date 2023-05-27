import React, { useMemo } from "react";
import cn from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      type,
      name,
      onChange,
      label,
      extClassName,
      placeholder,
      error,
      errorText,
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const errorToRender = useMemo(
      () =>
        error && errorText ? (
          <span className={cn(styles.error, "text")}>{errorText}</span>
        ) : null,
      [error, errorText]
    );

    const inputClass = error ? styles.input_error : styles.input

    return (
      <div className={extClassName}>
        {label && (
          <label className={cn(styles.label, "text")} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.container}>
          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            className={cn(inputClass, "text", "text_size_medium")}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            {...props}
          />
          {errorToRender}
        </div>
      </div>
    );
  }
);
