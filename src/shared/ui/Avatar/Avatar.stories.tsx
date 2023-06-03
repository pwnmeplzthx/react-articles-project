import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {};
Primary.args = {
    size: 150,
    src: '/avatar.jpg',
};

export const Small: Story = {};
Small.args = {
    size: 50,
    src: '/avatar.jpg',
};
