import { Meta, StoryObj } from '@storybook/react';
import { InputPhone } from '.';
import styles from './styles.module.css';
import { Controller, useForm, useWatch } from 'react-hook-form';

const meta = {
  title: 'uikit/FormElements/InputPhone',
  component: InputPhone,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
  },
} as Meta<typeof InputPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: false,
    errorText: 'Введите номер телефона полностью',
  },
  decorators: [
    function Component(Story, ctx) {
      const {
        control,
        formState: { errors },
      } = useForm({
        mode: 'onChange',
        defaultValues: {
          test: '',
        },
      });

      useWatch({ control, name: 'test' });

      return (
        <Controller
          control={control}
          rules={{
            required: 'Введите номер телефона',
            validate: (value) => {
              const digitsOnly = value.replace(/\D/g, '');
              return (
                digitsOnly.length === 11 || 'Введите номер телефона полностью'
              );
            },
          }}
          name={'test'}
          render={({ field }) => (
            <Story
              args={{
                ...ctx.args,
                ...field,
                name: 'test',
                error: ctx.args.error || !!errors?.test?.message,
                errorText: errors?.test?.message || ctx.args.errorText,
              }}
            />
          )}
        />
      );
    },
  ],
};

export const Error: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: true,
    errorText: 'Введите номер телефона полностью',
  },
};

export const Width350px: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: false,
    extClassName: styles.for_storybook,
  },
};
