import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

const meta: Meta<typeof Avatar>  = {
  title: "Avatar",
  component: Avatar, 
  tags: ["autodocs"],

  argTypes: {    
    avatarSize: {
      defaultValue: {summary: "elarge"} , 
      description: "размер аватара"
    },
    avatarLink: {
      defaultValue: {summary: "https://i.pravatar.cc/300"} ,    
      description: "ссылка на картинку аватара"
    },
    avatarName: {      
      description: "значение поля alt"
    },
    extClassName: {
      description: "классы для дополнительной стилизации"
    }
  }
} 

export default meta;
type Story = StoryObj<typeof meta>;


export const Elarge: Story = {
  args: {
    avatarSize: "elarge",
    avatarName: "Avatar large",  
  },
};


export const Large: Story = {
  args: {
    avatarSize: "large",
    avatarName: "Avatar large",
  },
};

export const Medium: Story = {
  args: {
    avatarSize: "medium",
    avatarName: "Avatar medium",
  },
};

export const Small: Story = {
  args: {
    avatarSize: "small",
    avatarName: "Avatar small", 
  },
};
