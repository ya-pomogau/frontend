import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Filter } from ".";

const meta: Meta<typeof Filter> = {
  title: "features/TasksFilter",
  component: Filter,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: {
    userRole: "admin",
    visible: true,
  },
};

export const Recipient: Story = {
  args: {
    userRole: "recipient",
    visible: true,
  },
};

export const Volunteer: Story = {
  args: {
    userRole: "volunteer",
    visible: true,
  },
};
