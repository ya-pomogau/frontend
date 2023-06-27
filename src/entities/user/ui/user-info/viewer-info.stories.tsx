import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import { store } from "app/store";
import { UserInfo } from ".";

const meta: Meta<typeof UserInfo> = {
  title: "Entities/UserInfo",
  component: UserInfo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: {
    roleForStoryBook: "admin",
  },
};

export const Recipient: Story = {
  args: {
    roleForStoryBook: "recipient",
  },
};

export const Volunteer: Story = {
  args: {
    roleForStoryBook: "volunteer",
  },
};
