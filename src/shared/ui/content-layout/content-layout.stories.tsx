import type { Meta, StoryObj } from "@storybook/react";
import { ContentLayout } from ".";

const meta: Meta<typeof ContentLayout> = {
  title: "ContentLayout",
  component: ContentLayout,
  tags: ["autodocs"],

  argTypes: {
    smart: {
      description: "Наполнение страницы, должно быть 2 компонента ",
    },
    children: {
      description: "Наполнение страницы, должно быть 2 компонента ",
    },
    extClassName: {
      description: "классы для дополнительной стилизации",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    smart: <h2> тут должен быть Контейнер смарт заголовка страницы</h2>
  },
  render: (args) => (
    <ContentLayout {...args}>
      <h2> Тут должен быть основной контент страницы</h2>
    </ContentLayout>
  ),
};
