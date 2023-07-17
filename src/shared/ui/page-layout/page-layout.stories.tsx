import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '.';
import { ContentLayout } from '../content-layout';

const meta: Meta<typeof PageLayout> = {
  title: 'uikit/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],

  argTypes: {
    side: {
      description: 'Наполнение правой части страницы',
    },
    content: {
      description: 'Компонент ContentLayout',
    },
    extClassName: {
      description:
        'Классы для дополнительной стилизации контента наполнения страницы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    side: <h2> Side </h2>,
    content: (
      <ContentLayout
        heading={<h2> тут должен быть Контейнер смарт заголовка страницы</h2>}
      >
        {' '}
        <h2>Контент</h2>{' '}
      </ContentLayout>
    ),
  },
};
