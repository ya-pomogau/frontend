import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '.';
import { userEvent, within } from '@storybook/testing-library';

/**
 * Компонент построен на уже существующем компоненте Input и может быть использован при
 * отрисовке инпута с паролем. Отрисовывается с элементом-"глазиком".
 */

const meta = {
  title: 'uikit/FormElements/PasswordInput',
  component: PasswordInput,
  //tags: ['autodocs'],
  argTypes: {
    onIconClick: {
      description: 'Функция, предназначенная для действий по клику на иконку.',
    },
    error: {
      control: 'boolean',
    },
    customIcon: {
      type: 'string',
      description:
        'Определяет иконку, которая будет высвечиваться справа в пределах инпута.',
    },
  },
} as Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    error: false,
  },
};

export const Error: Story = {
  args: {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    error: true,
    errorText: 'Вы ввели неправильный пароль',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('click on input', async () => {
      await userEvent.click(canvas.getByTestId('input'));
    });
    await step('type incorrect password', async () => {
      await userEvent.type(canvas.getByTestId('input'), 'test');
    });
    await step('click ouside', async () => {
      await userEvent.click(canvas.getByTestId('div'));
    });
  },
};
