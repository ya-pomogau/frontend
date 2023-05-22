import type { Meta, StoryObj } from "@storybook/react";
import { InfoContainer } from ".";

const meta: Meta<typeof InfoContainer> = {
  title: "InfoContainer",
  component: InfoContainer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
