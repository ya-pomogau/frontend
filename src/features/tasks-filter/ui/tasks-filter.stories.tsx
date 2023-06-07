import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { TasksFilter } from ".";

const meta: Meta<typeof TasksFilter> = {
  title: "features/TasksFilter",
  component: TasksFilter,
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
