import type { Meta, StoryObj } from "@storybook/react";
import { InfoContainerContent } from ".";

const meta: Meta<typeof InfoContainerContent> = {
  title: "InfoContainerContent",
  component: InfoContainerContent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
