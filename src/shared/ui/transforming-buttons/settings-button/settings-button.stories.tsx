import type { Meta, StoryObj } from "@storybook/react";
import { SettingsButton } from ".";

const meta = {
  title: "uikit/Buttons/SettingsButton",
  component: SettingsButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
