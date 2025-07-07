import type { Meta, StoryObj } from '@storybook/react-vite';
import { CellType } from 'src/types/CellType';
import { CellSet } from './CellSetDisplay';
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
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.SolidWall, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, contents: [{ id: 1, type: EntityType.Ant, color: 'red' }] },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.UndergroundSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, contents: [
                { id: 2, type: EntityType.Ant, color: 'blue' },
                { id: 3, type: EntityType.Food, quantity: 2 },
                { id: 4, type: EntityType.Ant, color: 'red' }
            ] },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace,  contents: [
                { id: 5, type: EntityType.Food, quantity: 8 },
                { id: 6, type: EntityType.Ant, color: 'red' }
            ] },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
            { type: CellType.OutdoorSpace, },
        ],
        onClick: (index: number) => {
            console.log(`Cell ${index} clicked`);
        }
    }
}
