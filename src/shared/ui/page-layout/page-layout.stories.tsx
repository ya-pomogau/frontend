import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '.';
import { ContentLayout } from '../content-layout';

const meta: Meta<typeof PageLayout> = {
  title: 'uikit/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],

  argTypes: {
    content: {
      description: 'Компонент ContentLayout',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
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
