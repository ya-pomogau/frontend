import type { Meta, StoryObj } from "@storybook/react";
import { store } from "app/store";
import { Provider } from "react-redux";

import { ViewerInfo } from ".";

const meta: Meta<typeof ViewerInfo> = {
  title: "Entities/ViewerInfo",
  component: ViewerInfo,
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
    roleForStoryBook: "consumer",
  },
};

export const Volunteer: Story = {
  args: {
    roleForStoryBook: "volunteer",
  },
};
