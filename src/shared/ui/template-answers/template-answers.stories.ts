import type { Meta, StoryObj } from '@storybook/react';

import { TemplateAnswers } from './index';

const meta: Meta<typeof TemplateAnswers> = {
  title: 'uikit/TemplateAnswers',
  component: TemplateAnswers,
  tags: ['autodocs'],
  argTypes: {
    answers: {
      description: 'Список фраз для ответа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    answers: [
      'Здравствуйте, спасибо, что обратились.',
      'Я не могу ответить прямо сейчас, но обязательно вернусь с ответом в течении часа.',
      'Будут вопросы — обращайтесь.',
    ],
  },
};
