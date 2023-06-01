import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from ".";

const meta: Meta<typeof DatePicker> = {
  title: "uikit/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "Текущая дата",
      control: "date",
    },
    onChangeValue: {
      description: "Обработчик события изменения даты",
    },
    isMobile: {
      description: "Переключение версии календаря",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: new Date(),
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    value: new Date(),
    isMobile: true,
  },
};
