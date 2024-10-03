import type { Meta, StoryObj } from '@storybook/react';

import { CategoriesBackground } from '.';

import styles from './styles.module.css';

const meta: Meta<typeof CategoriesBackground> = {
  title: 'uikit/CategoriesBackground',
  component: CategoriesBackground,
  tags: ['autodocs'],
  argTypes: {
    content: { type: 'string' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    theme: 'secondary',
  },
};

export const Success: Story = {
  args: {
    theme: 'success',
  },
};

export const Warning: Story = {
  args: {
    theme: 'warning',
  },
};

export const WithLabel: Story = {
  args: {
    theme: 'primary',
    content: 'категория',
    size: 'medium',
  },
};

export const Example: Story = {
  args: {
    theme: 'primary',
    size: 'medium',
    extClassName: `${styles.storybookCategory}`,
  },
  render: (args) => (
    <>
      <CategoriesBackground
        content="сопровождение"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="покупка вещей"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="покупка вещей/техники"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="помощь в уборке"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="ремонт техники/жилья"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="первеозка в личном транспорте"
        {...args}
        size="large"
      ></CategoriesBackground>
      <CategoriesBackground
        content="помощь в подъёме/спуске"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="Помощь в готовке"
        {...args}
      ></CategoriesBackground>
      <CategoriesBackground
        content="Организация досуга"
        {...args}
      ></CategoriesBackground>
    </>
  ),
};
