import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from '.';

/**
 * Данный компонент является модальным окном, который с помощью React.createPortal
 * добавляется в div-элемент с идентификатором "modal", который находится в body документа.
 * Рекомендуется модальному
 * окну передавать css-свойства с настройками абсолютного позиционирования для того, чтобы иметь
 * возможность расположения его в необходимом месте. Для вызова компонента необходимо передать
 * ему пропс visible со значение true. Предусмотрено закрытие компонента с помощью нажатия кнопки
 * escape и кликом за пределами компонента (для этого пропс changeVisible должен передавать
 * соответствующую функцию).
 */

const meta: Meta<typeof Tooltip> = {
  title: 'uikit/Tooltip',
  component: Tooltip,
  // tags: ["autodocs"],
  argTypes: {
    extClassName: {
      description:
        'Данная настройка используется для передачи css-свойств в виде строки селектора. Свойства могут быть определны в css-модуле компонента, в котором используется Tootip.',
    },
    visible: {
      description: 'Определяет видимость модального окна.',
    },
    pointerPosition: {
      description: 'Определяет расположение уголка компонента Tooltip.',
    },
    changeVisible: {
      description:
        'Функция, предназначенная для закрытия компонента Tooltip (изменения значения пропса visible).',
    },
    elementStyles: {
      description:
        'Позволяет передавать компоненту css-свойства в виде инлайн-стилей. Можно использовать для передачи данных, необходимых для позиционирования модального окна, если их невозможно определить заранее и они высчитываются в момент рендеринга компонента.',
    },
    children: {
      description:
        'Элементы ReactNode, который будут отрисованы внутри компонента.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'Какой-то контент',
  },
};

export const CenterPointer: Story = {
  args: {
    visible: true,
    children: 'Какой-то контент',
    pointerPosition: 'center',
  },
};
