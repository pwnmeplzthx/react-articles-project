import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const PrimaryDark: Story = {
    args: {
        children: 'Text',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear: Story = {
    args: {
        theme: ThemeButton.CLEAR,
        children: 'Text',
    },
};

export const ClearDark: Story = {
    args: {
        theme: ThemeButton.CLEAR,
        children: 'Text',
    },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
    },
};

export const OutlineDark: Story = {
    args: {
        theme: ThemeButton.OUTLINE,
        children: 'Text',
    },
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
