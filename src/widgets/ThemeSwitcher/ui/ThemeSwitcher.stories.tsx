import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'widget/ThemeSwitcher',
    component: ThemeSwitcher,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Normal: Story = {};
Normal.args = {};

export const Dark: Story = {};
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
