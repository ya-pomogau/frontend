import type { Meta, StoryObj } from '@storybook/react';

import {
  SideMenuContainer,
  SideMenuContainerProps,
} from './side-menu-container';
import { Default as CardButtonStory } from '../../shared/ui/card-button/card-button.stories';
import { CardButton } from '../../shared/ui/card-button/index';

type WrapperProps = SideMenuContainerProps;

export function Wrapper({ border, size, overlayVisible }: WrapperProps) {
  return (
    <SideMenuContainer
      border={border}
      size={size}
      overlayVisible={overlayVisible}
    >
      <CardButton {...CardButtonStory.args} text="Короткий текст" />
      <CardButton
        {...CardButtonStory.args}
        text="На этой кнопке текста больше"
      />
      <CardButton {...CardButtonStory.args} text="Просто текст для кнопки" />
    </SideMenuContainer>
  );
}

const meta: Meta<typeof Wrapper> = {
  title: 'uikit/ButtonContainer',
  component: Wrapper,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    overlayVisible: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Authorized: Story = {
  args: {
    overlayVisible: true,
  },
};

export const Unauthorized: Story = {
  args: {
    overlayVisible: false,
  },
};
