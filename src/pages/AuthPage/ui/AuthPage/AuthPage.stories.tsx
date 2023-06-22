import { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AuthPage from './AuthPage';

const meta: Meta<typeof AuthPage> = {
    title: 'pages/AuthPage',
    component: AuthPage,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof AuthPage>;

export const Normal: Story = {};
Normal.args = {};

export const Dark: Story = {};
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
