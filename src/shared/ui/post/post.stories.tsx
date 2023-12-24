import type { Meta, StoryObj } from '@storybook/react';
import { Post } from './Post';

const meta: Meta<typeof Post> = {
  component: Post,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '919px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const Default: Story = {
  args: {
    title: 'Благотворительность в рекламе',
    description:
      'Реклама благотворительности встречается везде: от интернет-сайтов до уличных билбордов. И наверняка вы хоть раз встречали сообщения, которые рассказывали о важности помогать разным категориям людей. Мы совместно с благотворительными организациями создаем рекламные кампании и продвигаем идею благотворительности разными способами. Выстраиваем качественную коммуникацию с целевой аудиторией на основе исследований, которые особенно важно проводить при работе с благотворительной сферой. В этой статье мы поделимся нюансами, которые стоит учитывать в рекламе данной сферы, а также расскажем об ее развитии.',
    images: [
      {
        src: 'https://img.freepik.com/free-vector/flat-style-colorful-volunteers-team-hand-up-with-love-heart-vector_1017-48260.jpg?w=1380&t=st=1703355725~exp=1703356325~hmac=d7531c06dc7355783d0b234e08b9ea9b49b37abc79cf5acf01e0879e8ba6f19a',
        alt: '',
      },
    ],
  },
};

export const Gallery2: Story = {
  args: {
    title: 'Благотворительность в рекламе',
    description:
      'Реклама благотворительности встречается везде: от интернет-сайтов до уличных билбордов. И наверняка вы хоть раз встречали сообщения, которые рассказывали о важности помогать разным категориям людей. Мы совместно с благотворительными организациями создаем рекламные кампании и продвигаем идею благотворительности разными способами. Выстраиваем качественную коммуникацию с целевой аудиторией на основе исследований, которые особенно важно проводить при работе с благотворительной сферой. В этой статье мы поделимся нюансами, которые стоит учитывать в рекламе данной сферы, а также расскажем об ее развитии.',
    images: [
      {
        src: 'https://img.freepik.com/free-vector/flat-style-colorful-volunteers-team-hand-up-with-love-heart-vector_1017-48260.jpg?w=1380&t=st=1703355725~exp=1703356325~hmac=d7531c06dc7355783d0b234e08b9ea9b49b37abc79cf5acf01e0879e8ba6f19a',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-photo/people-holding-rubber-heart_1150-18576.jpg?w=1380&t=st=1703355770~exp=1703356370~hmac=7d66443953cab65669b3a5aec3918aa419b9bbc94faca694fcb092f0a96d3bcc',
        alt: '',
      },
    ],
  },
};

export const Gallery3: Story = {
  args: {
    title: 'Благотворительность в рекламе',
    description:
      'Реклама благотворительности встречается везде: от интернет-сайтов до уличных билбордов. И наверняка вы хоть раз встречали сообщения, которые рассказывали о важности помогать разным категориям людей. Мы совместно с благотворительными организациями создаем рекламные кампании и продвигаем идею благотворительности разными способами. Выстраиваем качественную коммуникацию с целевой аудиторией на основе исследований, которые особенно важно проводить при работе с благотворительной сферой. В этой статье мы поделимся нюансами, которые стоит учитывать в рекламе данной сферы, а также расскажем об ее развитии.',
    images: [
      {
        src: 'https://img.freepik.com/free-vector/flat-style-colorful-volunteers-team-hand-up-with-love-heart-vector_1017-48260.jpg?w=1380&t=st=1703355725~exp=1703356325~hmac=d7531c06dc7355783d0b234e08b9ea9b49b37abc79cf5acf01e0879e8ba6f19a',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-photo/people-holding-rubber-heart_1150-18576.jpg?w=1380&t=st=1703355770~exp=1703356370~hmac=7d66443953cab65669b3a5aec3918aa419b9bbc94faca694fcb092f0a96d3bcc',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-vector/hand-giving-heart-healthy-donation-jar-sides-which-tiny-people-standing-generous-community-giving-help-hope-love-support-flat-vector-illustration-social-support-charity-concept_74855-21133.jpg?w=1380&t=st=1703355793~exp=1703356393~hmac=1b0af379a7245abe8746e34f51719545a386492a9f33a44ace724e9fbd89c8f8',
        alt: '',
      },
    ],
  },
};

export const Gallery4: Story = {
  args: {
    title: 'Благотворительность в рекламе',
    description:
      'Реклама благотворительности встречается везде: от интернет-сайтов до уличных билбордов. И наверняка вы хоть раз встречали сообщения, которые рассказывали о важности помогать разным категориям людей. Мы совместно с благотворительными организациями создаем рекламные кампании и продвигаем идею благотворительности разными способами. Выстраиваем качественную коммуникацию с целевой аудиторией на основе исследований, которые особенно важно проводить при работе с благотворительной сферой. В этой статье мы поделимся нюансами, которые стоит учитывать в рекламе данной сферы, а также расскажем об ее развитии.',
    images: [
      {
        src: 'https://img.freepik.com/free-vector/flat-style-colorful-volunteers-team-hand-up-with-love-heart-vector_1017-48260.jpg?w=1380&t=st=1703355725~exp=1703356325~hmac=d7531c06dc7355783d0b234e08b9ea9b49b37abc79cf5acf01e0879e8ba6f19a',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-photo/people-holding-rubber-heart_1150-18576.jpg?w=1380&t=st=1703355770~exp=1703356370~hmac=7d66443953cab65669b3a5aec3918aa419b9bbc94faca694fcb092f0a96d3bcc',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-vector/hand-giving-heart-healthy-donation-jar-sides-which-tiny-people-standing-generous-community-giving-help-hope-love-support-flat-vector-illustration-social-support-charity-concept_74855-21133.jpg?w=1380&t=st=1703355793~exp=1703356393~hmac=1b0af379a7245abe8746e34f51719545a386492a9f33a44ace724e9fbd89c8f8',
        alt: '',
      },
      {
        src: 'https://img.freepik.com/free-vector/charity-doodle-vector-hand-giving-heart-money-donation-concept_53876-143487.jpg?w=826&t=st=1703355832~exp=1703356432~hmac=79e19d136281dd822bba37507855450afc50089616c7c4edf237b0658a786bbe',
        alt: '',
      },
    ],
  },
};
