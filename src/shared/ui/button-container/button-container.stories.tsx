import type { Meta } from "@storybook/react";
import { ButtonContainer, ButtonContainerProps } from ".";
import { Default as CardButtonStory } from "../card-button/card-button.stories";
import { CardButton } from "../card-button/index";

type WrapperProps = ButtonContainerProps;

export function Wrapper({ border, size }: WrapperProps) {
  return (
    <ButtonContainer border={border} size={size}>
      <CardButton {...CardButtonStory.args} text="Короткий текст" />
      <CardButton
        {...CardButtonStory.args}
        text="На этой кнопке текста больше"
      />
      <CardButton {...CardButtonStory.args} text="Просто текст для кнопки" />
    </ButtonContainer>
  );
}
const meta: Meta<typeof Wrapper> = {
  title: "uikit/ButtonContainer",
  component: Wrapper,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
