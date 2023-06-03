import { Meta, StoryObj } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

const meta: Meta<typeof CountrySelect> = {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;

export const Primary: Story = {};
Primary.args = {};
