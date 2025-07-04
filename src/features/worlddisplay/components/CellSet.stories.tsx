import type { Meta, StoryObj } from '@storybook/react';
import { CellType } from 'src/types/CellType';
import { CellSet } from './CellSet';
import { EntityType } from 'src/types/EntityType';

const meta = {
    title: 'CellSet',
    component: CellSet,
} satisfies Meta<typeof CellSet>;

export default meta;

type Story = StoryObj<typeof CellSet>;

export const Simple: Story = {
    args: {
        columns: 9,
        cells: [
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.SolidWall,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.UndergroundSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
            CellType.OutdoorSpace,
        ],
        entities: {
            21: [
                { id: 1, type: EntityType.Ant, color: 'red' }
            ],
            60: [
                { id: 2, type: EntityType.Ant, color: 'blue' },
                { id: 3, type: EntityType.Food, quantity: 2 },
                { id: 4, type: EntityType.Ant, color: 'red' }
            ],
            75: [
                { id: 5, type: EntityType.Food, quantity: 8 },
                { id: 6, type: EntityType.Ant, color: 'red' }
            ],
        },
        onClick: (index: number) => {
            console.log(`Cell ${index} clicked`);
        }
    }
}
