import type { Meta, StoryObj } from "@storybook/react";
import RadioButton from "shared/ui/radiobutton";

const meta: Meta<typeof RadioButton> = {
  title: "UI / Radiobutton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Радиокнопки для форм и фильтров",
      },
    },
  },
  argTypes: {
    label: {
      description: "Текст для кнопки",
      required: true,
    },
    checked: {
      description: "Состояние радиокнопки",
      options: [false, true],
      control: { type: "radio" },
    },
    disabled: {
      description: "Неактивная (заблокированная) радиокнопка",
      options: [false, true],
      control: { type: "radio" },
    },
    id: {
      description: "Обязательно указывать id",
    },
    name: {
      description: "Указывать одинаковый name для группы радиокнопок",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const defaultRadioButton: Story = {
  args: {
    label: "1km",
    checked: false,
    disabled: false,
    id: "test-1",
  },
};

export const checkedRadioButton: Story = {
  args: {
    ...defaultRadioButton.args,
    checked: true,
  },
};

export const disabledRadioButton: Story = {
  args: {
    ...defaultRadioButton.args,
    disabled: true,
  },
};

export const groupRadioButtons = (args: typeof RadioButton) => (
  <>
    <RadioButton label="1 km" name="group" id="test" />
    <RadioButton label="5 km" name="group" id="test-2" defaultChecked />
    <RadioButton label="113 km" name="group" id="test-3" disabled />
  </>
);
