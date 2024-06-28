import { ChangeEvent, useState } from 'react';

export default function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T>(initialValues);
  const [isValid, setIsValid] = useState(false);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid((target.closest('form') as HTMLFormElement).checkValidity());
  };

  const resetForm = (
    newValues = initialValues,
    newErrors = initialValues,
    newIsValid = false
  ) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
