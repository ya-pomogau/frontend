import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '.';

const meta: Meta<typeof Typography> = {
  title: 'shared/ui/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const PrimaryTitleText: Story = {
  args: {
    tag: 'h1',
    content: 'Активные заявки',
    variant: 'title',
    color: 'primary',
    fontFamily: 'primaryFont',
  },
};

export const SecondaryTitleText: Story = {
  args: {
    tag: 'h1',
    content: 'Нужно связаться с администратором',
    variant: 'title',
    color: 'primary',
    fontFamily: 'secondaryFont',
  },
};

export const SecondaryTitleTextnInterfaceAdditional: Story = {
  args: {
    tag: 'h1',
    content: 'Вы заблокированы ',
    variant: 'title',
    color: 'interface-additional',
    fontFamily: 'secondaryFont',
  },
};

export const PrimaryTitleTextFuchsia: Story = {
  args: {
    tag: 'h1',
    content: '16:00',
    variant: 'title',
    color: 'fuchsia',
    fontFamily: 'primaryFont',
  },
};

export const PrimaryParagraphText: Story = {
  args: {
    tag: 'p',
    content: 'Иванов Иван Иванович',
    variant: 'paragraph',
    color: 'primary',
    fontFamily: 'primaryFont',
  },
};

export const PrimaryParagraphTextBold: Story = {
  args: {
    tag: 'p',
    content: 'До начала заявки менее 24 часа',
    variant: 'paragraph-bold',
    color: 'black',
    fontFamily: 'primaryFont',
  },
};

export const SecondaryParagraphText: Story = {
  args: {
    tag: 'p',
    content: 'Пожалуйста, погуляйте с моей...',
    variant: 'paragraph',
    color: 'black',
    fontFamily: 'secondaryFont',
  },
};

export const PrimarySupportText: Story = {
  args: {
    tag: 'p',
    content: '8 (000) 000-00-00',
    variant: 'support',
    color: 'primary',
    fontFamily: 'primaryFont',
  },
};

export const PrimarySupportBold: Story = {
  args: {
    tag: 'p',
    content: 'Дата и время',
    variant: 'support-bold',
    color: 'black',
    fontFamily: 'primaryFont',
  },
};

export const SecondarySupportText: Story = {
  args: {
    tag: 'p',
    content: 'Откликнуться',
    variant: 'support',
    color: 'black',
    fontFamily: 'secondaryFont',
  },
};

export const ErrorMessageText: Story = {
  args: {
    tag: 'p',
    content: 'Неверный формат номера',
    variant: 'support',
    color: 'orange',
    fontFamily: 'primaryFont',
  },
};

export const ErrorText: Story = {
  args: {
    tag: 'p',
    content: '+7 (000) 000-',
    variant: 'paragraph',
    color: 'red',
    fontFamily: 'primaryFont',
  },
};

export const HelperText: Story = {
  args: {
    tag: 'p',
    content: 'Помощь в готовке',
    variant: 'helperText',
    color: 'black',
    fontFamily: 'primaryFont',
  },
};

export const ServicesText: Story = {
  args: {
    tag: 'p',
    content: 'ID12345678',
    variant: 'servicesText',
    color: 'ID-text',
    fontFamily: 'primaryFont',
  },
};

export const InputTitleText: Story = {
  args: {
    tag: 'p',
    content: 'Телефон',
    variant: 'input-title',
    color: 'primary',
    fontFamily: 'primaryFont',
  },
};
