import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationNotice } from '.';

const meta: Meta<typeof RegistrationNotice> = {
  title: 'uikit/RegistrationNotice',
  component: RegistrationNotice,
  tags: ['autodocs'],
  argTypes: {
    settingText: {
      description:
        'Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  name: 'Registration Notice - Filled',
  args: {
    settingText:
      'Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки.',
  },
};
