import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from ".";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Заголовок для approve-диалога",
    },
    isAlertDialog: {
      description: "Диалоговое окно предупреждений/сообщений",
    },
    isConfirmDialog: {
      description: "Диалоговое окно, требующее подтверждения/отмены действия",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertDialog: Story = {
  args: {
    title: "Благодарю за отзывчивость",
    isOpened: true,
    isAlertDialog: true,
  },
};

export const ConfirmDialog: Story = {
  args: {
    title: "Вы точно хотите отменить заявку?",
    isExitButton: true,
    isOpened: true,
    isConfirmDialog: true,
  },
};
