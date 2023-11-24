import type { Meta, StoryObj } from '@storybook/react';

import { ConflictUserCard } from '.';

const meta: Meta<typeof ConflictUserCard> = {
  title: 'uikit/ConflictUserCard',
  component: ConflictUserCard,
  tags: ['autodocs'],
  argTypes: {
    role: { type: 'string' },
    extClassName: { type: 'string' },
    avatarLink: { type: 'string' },
    avatarName: { type: 'string' },
    userName: { type: 'string' },
    userId: { type: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VolunteerCard: Story = {
  args: {
    role: 'Волонтер',
    userName: 'Петров Петр Петрович',
    userId: 11111114,
    avatarLink: 'https://i.pravatar.cc/300',
    avatarName: 'avatar',
  },
};

export const RecipientCard: Story = {
  args: {
    role: 'Реципиент',
    userName: 'Петров Петр Петрович',
    userId: 11111114,
    avatarLink: 'https://i.pravatar.cc/300',
    avatarName: 'avatar',
  },
};
