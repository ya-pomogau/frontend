import type { Meta, StoryObj } from "@storybook/react";

import { SmartHeader } from ".";
import {EditIcon} from "./icont";

const meta: Meta<typeof SmartHeader> = {
    title: "SmartHeader",
    component: SmartHeader,
    tags: ["autodocs"],

};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        filterText: 'asd',
        filterIcon: <EditIcon />
    },
};