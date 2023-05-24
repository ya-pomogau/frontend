import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from ".";
import { Button } from "../button-example";

const meta: Meta<typeof UserCard>  = {
  title: "UserCard",
  component: UserCard, 
  tags: ["autodocs"],

  argTypes: {
    extClassName: {
      description: "классы для дополнительной стилизации"
    },   
    avatarLink: {
      defaultValue: {summary: "https://i.pravatar.cc/300"} ,    
      description: "ссылка на картинку аватара"
    },
    avatarName: {      
      description: "значение поля alt для аватара"
    },
    userName: {
      description: "ФИО пользователя"
    },
    userId: {
      description: "ID пользователя"
    },
    userNumber: {
      description: "номер телефона пользователя"
    },
    children: {
      description: "компонент с кнопками для предоставления доступов пользователям" 
    }
  }
} 

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {    
    avatarName: "Avatar",
    avatarLink: "https://i.pravatar.cc/300",
    userName: "Иванов Иван Иванович",
    userId: 123456789,
    userNumber: "+7 (111) 222-22-22",
  },
};

/* export const ExampleButtons = (args) => (
	<UserCard {...args}>
		<Button lable="small" />
		<Button lable="normal" />
		<Button lable="medium" />
		<Button lable="large"/>
	</UserCard>
);  */

/* export const ExampleButtons: Story = (
  render: (args) => {
    <UserCard {...args}>
      <ListItem />
      <ListItem />
      <ListItem />
    </UserCard>
  }
);
 */

/* export const ExampleButtons: Story = {
  render: () => <UserCard avatarName="Avatar" > <Button> </UserCard>
}; */

/* export const ExampleButtons = () => {    
   
  render: () => {
    <UserCard {...args}>
      <Button label="кнопка">
    </UserCard>
  }
 
  }
 */

