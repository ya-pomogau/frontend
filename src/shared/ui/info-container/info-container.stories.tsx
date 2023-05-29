import type { Meta, StoryObj } from "@storybook/react";
import { InfoContainer } from ".";
import { Default as InfoContainerContentStory } from "../info-container-content/info-container-content.stories";
import { InfoContainerContent } from "../info-container-content/index";

const meta: Meta<typeof InfoContainer> = {
  title: "InfoContainer",
  component: InfoContainer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutContent: Story = {};

export const WithContent: Story = {
  render: (args) => (
    <InfoContainer {...args}>
      <InfoContainerContent {...InfoContainerContentStory.args} />
    </InfoContainer>
  ),
};
