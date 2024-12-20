import { Meta, StoryObj } from "@storybook/react/*";
import { WrapperTruncate } from "./";

const meta: Meta<typeof WrapperTruncate> = {
  title: 'shared/ui/WrapperTruncate',
  component: WrapperTruncate,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WrapperTruncate>;

export const MoreSymbols: Story = {
  args: {
    symbolsForCutting: 50,
    textButtonForReading: "Читать",
    textButtonForCollapsing: "Свернуть",
    text: "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните."
  },
};

export const LessSymbols: Story = {
  args: {
    symbolsForCutting: 50,
    textButtonForReading: "Читать",
    textButtonForCollapsing: "Свернуть",
    text: "Пожалуйста, погуляйте с моей собакой"
  },
};