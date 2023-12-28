import { StoryObj } from '@storybook/react';
import { InputWrapper } from '.';

const meta = {
  title: 'uikit/InputWrapper',
  component: InputWrapper,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Что видит пользователь',
      defaultValue: 'Напишите сообщение...',
    },
    inputValue: {
      description: 'Что пишет пользователь',
      defaultValue: '',
    },
    name: { description: 'Имя для input', defaultValue: 'input' },
    extClassInput: {
      description: 'Класс для элемента input',
      defaultValue: '',
    },
    onChange: {
      description: 'Функция для возрата текста',
      defaultValue: () => {},
    },
    customIcon: {
      description: 'Иконки которые можно добавить в компонент',
      defaultValue: '',
    },
    onClickBtn: {
      description: 'Функция для кнопки',
      defaultValue: '',
    },
    extClassButton: {
      description: 'Класс для кнопки',
      defaultValue: '',
    },
    getFile: {
      description: 'Получить файл',
      defaultValue: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Напишите сообщение...',
    inputValue: '',
    name: 'input',
    extClassInput: '',
    onChange: () => {},
    onClickBtn: () => {},
    getFile: () => {},
  },
};
