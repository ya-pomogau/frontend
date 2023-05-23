import type { Meta, StoryObj } from "@storybook/react";
import { OverlayingPopup } from ".";

const meta: Meta<typeof OverlayingPopup> = {
  title: "OverlayingPopup",
  component: OverlayingPopup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
