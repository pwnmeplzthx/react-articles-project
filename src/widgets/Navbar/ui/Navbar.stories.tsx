import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Light: Story = {};
Light.args = {};

export const Dark: Story = {};
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
