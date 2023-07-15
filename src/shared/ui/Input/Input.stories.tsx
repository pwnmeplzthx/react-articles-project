import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const PrimaryInput: Story = {
    args: {
        placeholder: 'Type text',
        value: '123123',
    },
};

export const DarkInput: Story = {
    args: {
        placeholder: 'Type text',
        value: '123123',
    },
};
DarkInput.decorators = [ThemeDecorator(Theme.DARK)];
