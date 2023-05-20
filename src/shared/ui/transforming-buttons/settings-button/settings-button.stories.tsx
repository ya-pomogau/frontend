import type {Meta, StoryObj} from "@storybook/react";
import {SettingsButton} from ".";

const meta = {
    title: "SettingsButton",
    component: SettingsButton,
    tags: ["autodocs"]
} satisfies Meta<typeof SettingsButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};