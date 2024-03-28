import { ChangeEvent, useState } from 'react';

export default function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
