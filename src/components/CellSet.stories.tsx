import type { Meta, StoryObj } from '@storybook/react';
import { CellType } from 'src/features/simulation/types/CellType';
import { CellSet } from './CellSet';

const meta = {
    title: 'CellSet',
    component: CellSet,
} satisfies Meta<typeof CellSet>;

export default meta;

type Story = StoryObj<typeof CellSet>;

export const Simple: Story = {
    args: {
        columns: 3,
        cells: [
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
        ],
    }
}
