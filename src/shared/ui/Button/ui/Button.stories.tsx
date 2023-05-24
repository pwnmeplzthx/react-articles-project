import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from './Button';

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
        theme: ButtonTheme.CLEAR,
        children: 'Text',
    },
};

export const ClearInverted: Story = {
    args: {
        theme: ButtonTheme.CLEAR_INVERTED,
        children: 'Text',
    },
};

export const ClearDark: Story = {
    args: {
        theme: ButtonTheme.CLEAR,
        children: 'Text',
    },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        children: 'Text',
    },
};

export const OutlineSizeL: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        children: 'Text',
        size: ButtonSize.L,
    },
};

export const OutlineSizeXL: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        children: 'Text',
        size: ButtonSize.XL,
    },
};

export const OutlineDark: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        children: 'Text',
    },
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND,
        children: 'Text',
    },
};

export const InvertedBackgroundTheme: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED,
        children: 'Text',
    },
};

export const Square: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED,
        children: '>',
        square: true,
    },
};

export const SquareSizeL: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED,
        children: '>',
        square: true,
        size: ButtonSize.L,
    },
};

export const SquareSizeXL: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED,
        children: '>',
        square: true,
        size: ButtonSize.XL,
    },
};
