import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dicta architecto iste natus debitis ipsum repellat maiores, consectetur voluptatibus velit non inventore commodi quos dolore odio eius, veritatis assumenda suscipit?',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dicta architecto iste natus debitis ipsum repellat maiores, consectetur voluptatibus velit non inventore commodi quos dolore odio eius, veritatis assumenda suscipit?',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
