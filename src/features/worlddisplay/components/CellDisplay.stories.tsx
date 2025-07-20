import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cell } from './CellDisplay';
import { CellType } from 'src/types/CellType';
import { ScentType } from 'src/types/ScentType';

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
        scents: {
            [ScentType.Food]: 0.5
        }
    }
}

export const OutdoorSpace: Story = {
    args: {
        cellType: CellType.OutdoorSpace,
    }
}
