import type { Meta, StoryObj } from '@storybook/react-vite';
import { World } from './WorldDisplay';

const meta = {
    title: 'World',
    component: World,
} satisfies Meta<typeof World>;

export default meta;

type Story = StoryObj<typeof World>;

export const Simple: Story = {
    args: {
        worldIdentifier: 'simpleWorld',
    }
}
