import { Ant } from '../../classes/Ant';
import { World } from '../../classes/World';
import { WorldCell } from '../../classes/WorldCell';
import { CellType } from 'src/types/CellType';
import { indexFromCoordinate } from 'src/utils/coordinates';
import type { IBehaviorList } from '../../types/IBehaviorList';
import { IsIndoors } from '../../classes/conditions/IsIndoors';
import { MoveRandomly } from '../../classes/actions/MoveRandomly';

export function createBasicWorld() {
    const rows = 24;
    const columns = 30;

    const cells: Array<WorldCell> = new Array(rows * columns);
    
    for (let row = 0; row < rows; row++) {
        const cellType = row < 5
            ? CellType.SolidWall
            : row < 16
                ? CellType.UndergroundSpace
                : CellType.OutdoorSpace;

        for (let col = 0; col < columns; col++) {
            const index = indexFromCoordinate({ col, row }, columns);
            cells[index] = new WorldCell(index, row, col, cellType);
        }
    }

    const antBehavior: IBehaviorList<Ant> = {
        behaviors: [
            {
                id: 1,
                conditions: [
                    new IsIndoors(true),
                ],
                actions: [
                    new MoveRandomly(), 
                ],
            }
        ]
    };

    new Ant(1, cells[200], antBehavior);



    return new World(rows, columns, cells);
}