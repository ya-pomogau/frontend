import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { PostForm } from './PostForm';
import { nanoid } from 'nanoid';
import { ChangeEvent } from 'react';

const meta: Meta<typeof PostForm> = {
  component: PostForm,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '919px' }}>
        <Story />
      </div>
    ),
    function Component(Story, ctx) {
      const [args, setArgs] = useArgs<typeof ctx.args>();

      const addAttachment = (fileList: FileList | null) => {
        if (!fileList) return;

        ctx.args.addAttachment?.(fileList);

        const additionalImages = Array.from(fileList).map((file) => ({
          id: `${nanoid()}`,
          name: file.name,
        }));

        setArgs({ images: [...(args.images ?? []), ...additionalImages] });
      };

      const removeAttachment = (id: string) => {
        ctx.args.removeAttachment?.(id);

        const images = args.images?.filter((image) => image.id !== id);
        setArgs({ images });
      };
      const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        ctx.args.handleChange?.(e);

        setArgs({ [e.target.name]: e.target.value });
      };

      return (
        <Story
          args={{
            ...ctx.args,
            addAttachment,
            removeAttachment,
            handleChange,
          }}
        />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof PostForm>;

export const Default: Story = {};

export const WithData: Story = {
  args: {
    title: 'Благотворительность в рекламе',
    description:
      'Реклама благотворительности встречается везде: от интернет-сайтов до уличных билбордов. И наверняка вы хоть раз встречали сообщения, которые рассказывали о важности помогать разным категориям людей. Мы совместно с благотворительными организациями создаем рекламные кампании и продвигаем идею благотворительности разными способами. Выстраиваем качественную коммуникацию с целевой аудиторией на основе исследований, которые особенно важно проводить при работе с благотворительной сферой. В этой статье мы поделимся нюансами, которые стоит учитывать в рекламе данной сферы, а также расскажем об ее развитии.',
    images: [
      {
        id: '42',
        name: 'Фотография 42',
      },
      {
        id: '73',
        name: 'Фотография 73',
      },
    ],
  },
};
