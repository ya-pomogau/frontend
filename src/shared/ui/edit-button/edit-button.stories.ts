import type { Meta, StoryObj } from "@storybook/react";

import { EditButton } from ".";

const meta: Meta<typeof EditButton> = {
  title: "Buttons/EditButton",
  component: EditButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Изменить дату и время",
  },
};
