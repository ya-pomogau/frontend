import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '.';
import { UserRole } from '../../shared/types/common.types';

const meta: Meta<typeof UserCard> = {
  title: 'widgets/UserCard',
  component: UserCard,
  tags: ['autodocs'],

  argTypes: {
    user: {
      description: 'объект пользователя',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    user: {
      _id: '7',
      name: 'Волонтеров Петр Петрович',
      phone: '+7 (901) 123-45-67',
      avatar:
        'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '123456789',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 2,
      location: [59.942575, 30.216757],
      keys: true,
    },
  },
};

// export const VolunteerUserCardFirst: Story = {
//   args: {
//     role: UserRole.VOLUNTEER,
//     avatarName: 'Volunteer Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 12345,
//     userNumber: '+1 (123) 456-7890',
//     volunteerInfo: {
//       approved: false,
//       checked: false,
//       keys: false,
//       adminStatus: null,
//       scores: 0,
//     },
//   },
// };

// export const VolunteerUserCardSecond: Story = {
//   args: {
//     role: UserRole.VOLUNTEER,
//     avatarName: 'Volunteer Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 12345,
//     userNumber: '+1 (123) 456-7890',
//     volunteerInfo: {
//       approved: true,
//       checked: false,
//       keys: false,
//       adminStatus: null,
//       scores: 40,
//     },
//   },
// };

// export const VolunteerUserCardThird: Story = {
//   args: {
//     role: UserRole.VOLUNTEER,
//     avatarName: 'Volunteer Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 12345,
//     userNumber: '+1 (123) 456-7890',
//     volunteerInfo: {
//       approved: true,
//       checked: false,
//       keys: false,
//       adminStatus: null,
//       scores: 65,
//     },
//   },
// };

// export const VolunteerUserCardForth: Story = {
//   args: {
//     role: UserRole.VOLUNTEER,
//     avatarName: 'Volunteer Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 12345,
//     userNumber: '+1 (123) 456-7890',
//     volunteerInfo: {
//       approved: true,
//       checked: true,
//       keys: true,
//       adminStatus: null,
//       scores: 100,
//     },
//   },
// };

// export const RecipientUserCardFirst: Story = {
//   args: {
//     role: UserRole.RECIPIENT,
//     avatarName: 'Recipient Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 67890,
//     userNumber: '+1 (987) 654-3210',
//     volunteerInfo: {
//       approved: false,
//     },
//   },
// };

// export const RecipientUserCardSecond: Story = {
//   args: {
//     role: UserRole.RECIPIENT,
//     avatarName: 'Recipient Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 67890,
//     userNumber: '+1 (987) 654-3210',
//     volunteerInfo: {
//       approved: true,
//     },
//   },
// };

// export const AdminUserCardFirst: Story = {
//   args: {
//     role: UserRole.ADMIN,
//     avatarName: 'Recipient Avatar',
//     userName: 'Иванов Иван Иванович',
//     userId: 67890,
//     userNumber: '+1 (987) 654-3210',
//     volunteerInfo: {
//       approved: true,
//     },
//   },
// };
