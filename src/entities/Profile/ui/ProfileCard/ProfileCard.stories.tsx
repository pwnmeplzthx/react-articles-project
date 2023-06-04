import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Meta, StoryObj } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Normal: Story = {};
Normal.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Russia,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar: '/avatar.jpg',
    },
};

export const NormalWithError: Story = {};
NormalWithError.args = {
    error: 'true',
};

export const NormalLoading: Story = {};
NormalLoading.args = {
    isLoading: true,
};

export const Dark: Story = {};
Dark.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Russia,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar: '/avatar.jpg',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkWithError: Story = {};
DarkWithError.args = {
    error: 'true',
};
DarkWithError.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkLoading: Story = {};
DarkLoading.args = {
    isLoading: true,
};
DarkLoading.decorators = [ThemeDecorator(Theme.DARK)];
