import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { store } from "app/store";
import { Provider } from "react-redux";

import { ViewerInfo } from ".";

const meta: Meta<typeof ViewerInfo> = {
  title: "ViewerInfo",
  component: ViewerInfo,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const withProvider = (Component: React.ReactNode) => (
  <Provider store={store}>{Component}</Provider>
);

export const Admin: Story = {
  args: {
    roleForStoryBook: "admin",
  },
  render: (args) => withProvider(<ViewerInfo {...args} />),
};

export const Recipient: Story = {
  args: {
    roleForStoryBook: "recipient",
  },
  render: (args) => withProvider(<ViewerInfo {...args} />),
};

export const Volunteer: Story = {
  args: {
    roleForStoryBook: "volunteer",
  },
  render: (args) => withProvider(<ViewerInfo {...args} />),
};
