import type { Meta, StoryObj } from "@storybook/react";
import { AlertPopup } from ".";

const meta: Meta<typeof AlertPopup> = {
  title: "Alert-Popup",
  component: AlertPopup,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
