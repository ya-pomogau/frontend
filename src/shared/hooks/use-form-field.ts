import {
  Control,
  FieldError,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export interface UseFormFieldReturn {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  error?: FieldError;
}

const useFormField = (
  name: string,
  control: Control<any>,
  rules?: UseControllerProps['rules']
): UseFormFieldReturn => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return {
    value,
    onChange,
    onBlur,
    error,
  };
};

export default useFormField;
