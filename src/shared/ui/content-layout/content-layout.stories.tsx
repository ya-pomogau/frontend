import type { Meta, StoryObj } from '@storybook/react';
import { ContentLayout } from '.';

const meta: Meta<typeof ContentLayout> = {
  title: 'uikit/ContentLayout',
  component: ContentLayout,
  tags: ['autodocs'],

  argTypes: {
    heading: {
      description: 'Наполнение страницы, должно быть 2 компонента ',
    },
    children: {
      description: 'Наполнение страницы, должно быть 2 компонента ',
    },
    extClassName: {
      description: 'Классы для дополнительной стилизации',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    heading: <h2> тут должен быть Контейнер смарт заголовка страницы</h2>,
  },
  render: (args) => (
    <ContentLayout {...args}>
      <h2> Тут должен быть основной контент страницы</h2>
    </ContentLayout>
  ),
};
