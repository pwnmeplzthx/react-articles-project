import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'feature/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const PrimaryLoginForm: Story = {
    args: {},
};

export const DarkLoginForm: Story = {
    args: {},
};
DarkLoginForm.decorators = [ThemeDecorator(Theme.DARK)];
