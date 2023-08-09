import type { Meta, StoryObj } from '@storybook/react';
import { BalanceSettings } from '.';

const meta: Meta<typeof BalanceSettings> = {
  title: 'widgets/BalanceSettings',
  component: BalanceSettings,
  tags: ['autodocs'],
  // argTypes: {
  //   settingText: {
  //     description:
  //       'Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки.',
  //   },
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  name: 'Balance Settings - Filled',
  args: {
    settingText:
      'Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки.',
  },
};
