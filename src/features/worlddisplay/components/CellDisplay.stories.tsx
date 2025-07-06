import type { Meta, StoryObj } from '@storybook/react';
import { Cell } from './CellDisplay';
import { CellType } from 'src/types/CellType';

const meta = {
    title: 'Cell',
    component: Cell,
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof Cell>;

export const SolidWall: Story = {
    args: {
        cellType: CellType.UndergroundSpace,
    }
}

export const UndergroundSpace: Story = {
    args: {
        cellType: CellType.UndergroundSpace,
    }
}

export const OutdoorSpace: Story = {
    args: {
        cellType: CellType.OutdoorSpace,
    }
}
