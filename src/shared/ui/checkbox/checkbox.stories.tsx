import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "shared/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI / Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Чекбоксы для форм и фильтров",
      },
    },
  },
  argTypes: {
    checked: {
      description: "Состояние чекбокса",
      options: [false, true],
      control: { type: "radio" },
    },
    disabled: {
      description: "Неактивный (заблокированный) чекбокс",
      options: [false, true],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const UncheckedCheckbox: Story = {
  args: {
    label: "Unchecked Checkbox",
    checked: false,
    disabled: false,
    id: "test-1",
  },
};

export const CheckedCheckbox: Story = {
  args: {
    label: "Checked Checkbox",
    checked: true,
    disabled: false,
    id: "test-2",
  },
};

export const DisabledCheckbox: Story = {
  args: {
    label: "Disabled Checkbox",
    checked: false,
    disabled: true,
    id: "test-3",
  },
};
