import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

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
PrimaryLoginForm.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'asd' },
})];

export const DarkLoginForm: Story = {
    args: {},
};
DarkLoginForm.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    loginForm: { username: '123', password: 'asd' },
})];

export const WithError: Story = {
    args: {},
};
WithError.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    loginForm: { username: '123', password: 'asd', error: 'ERROR' },
})];

export const IsLoading: Story = {
    args: {},
};
IsLoading.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    loginForm: { isLoading: true },
})];
