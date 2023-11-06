import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '.';
import { CancelationReasonIds } from './consts';

const meta: Meta<typeof Dialog> = {
  title: 'uikit/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Заголовок для approve-диалога',
    },
    isAlertDialog: {
      description: 'Диалоговое окно предупреждений/сообщений',
    },
    isConfirmDialog: {
      description: 'Диалоговое окно, требующее подтверждения/отмены действия',
    },
    extClassName: {
      description: 'Класс для дополнительной стилизации',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskStarted: Story = {
  args: {
    isExitButton: true,
    title: 'Благодарим за отзывчивость',
    text: 'Мы ждем ответ реципиента',
    isTaskStarted: true,
    isMobile: false,
  },
};

export const TaskResponseIcon: Story = {
  args: {
    isExitButton: true,
    title: 'Благодарю за отзывчивость',
    isTaskResponseIcon: true,
    isContent: true,
    isTaskStarted: true,
    isMobile: false,
  },
};

export const TaskCancelReason: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    title: 'Укажите причину отмены',
    isTaskCancelationReason: true,
    isContent: true,
    isMobile: false,
  },
};

export const TaskCancel: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    title: 'Подтвердите, что заявка не выполнена',
    isTaskCancelation: true,
    isContent: true,
    isMobile: false,
  },
};

export const TaskClosingBeforePublicationRecipient: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    title: 'Вы точно хотите отменить заявку?',
    isTaskClosingBeforePublicationRecipient: true,
    isMobile: false,
  },
};

export const TaskResponse: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    title: 'До начала заявки менее 24 часа',
    text: 'Вы не можете отменить заявку самостоятельно.',
    isTaskResponse: true,
    isMobile: false,
  },
};

export const TaskInWork: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    title: 'На заявку откликнулись',
    text: 'Вы не можете отменить или отредактировать заявку самостоятельно.',
    isTaskResponse: true,
    isMobile: false,
  },
};

export const TaskClosingBeforePublicationMaster: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    text: 'При закрытии чат будет завершен и станет доступен всем администраторам',
    isTaskClosingBeforePublicationMaster: true,
    isMobile: false,
  },
};

export const Close: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    text: 'Закрыть окно сейчас и удалить ранее внесенную информацию?',
    isTaskClosingBeforePublicationMaster: true,
    isMobile: false,
  },
};

export const DeletePublication: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    text: 'Удалить публикацию?',
    isDeletePublication: true,
    isMobile: false,
  },
};

export const TaskOnMap: Story = {
  args: {
    isExitButton: true,
    text: 'Такая заявка уже существует. Дождитесь ее выполнения.',
    isTaskOnMap: true,
    isMobile: false,
  },
};

export const ChangePassword: Story = {
  args: {
    isExitButton: true,
    isGroupButton: true,
    isContent: true,
    title: 'Смена пароля',
    isChangePassword: true,
    isMobile: false,
  },
};

export const TaskClose: Story = {
  args: {
    isExitButton: true,
    isContent: true,
    title: 'Как закрыть заявку?',
    isTaskClose: true,
    isMobile: false,
  },
};

export const TaskUndone: Story = {
  args: {
    isExitButton: true,
    isContent: true,
    title: 'Не выполнена',
    text: `Причина: ${CancelationReasonIds.CANT_COME_IN}`,
    isTaskUndone: true,
    isMobile: false,
  },
};

export const TaskTaken: Story = {
  args: {
    isExitButton: true,
    isContent: true,
    title: 'Извините',
    text: `Эту заявку взяли в работу и откликнуться уже нельзя`,
    isTaskTaken: true,
    isMobile: false,
  },
};
