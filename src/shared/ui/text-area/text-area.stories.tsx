import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { ChangeEvent } from 'react';
import { TextArea } from '.';

import styles from './styles.module.css';

const meta: Meta<typeof TextArea> = {
  title: 'uikit/FormElements/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        ctx.args.onChange?.(e);

        setArgs({ value: e.target.value });
      };

      return <Story args={{ ...ctx.args, onChange }} />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    name: 'task',
    label: 'Опишите задачу',
    placeholder: 'Например: Помогите выгулять собаку.',
  },
};

export const Size440x170px: Story = {
  args: {
    name: 'task',
    label: 'Опишите задачу',
    placeholder: 'Например: Помогите выгулять собаку.',
    extClassName: styles.for_storybook,
    maxLength: 300,
  },
};
