import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./index";

const meta: Meta<typeof Dropdown> = {
  title: "uikit/DropDown/DropDown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    items:
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {

}
