import { Ant } from '../../classes/Ant';
import { World } from '../../classes/World';
import { WorldCell } from '../../classes/WorldCell';
import { CellType } from 'src/types/CellType';
import { indexFromCoordinate } from 'src/utils/coordinates';
import type { BehaviorList } from '../../types/BehaviorList';
import type { IActorSettings } from '../../types/IActorSettings';
import type { IQueenSettings } from '../../types/IQueenSettings';
import { Queen } from '../../classes/Queen';

const antSettings: IActorSettings = {
    satietyDrainRate: 0.1,
    initialSatiety: 5,
    maxHealth: 5,
}

const queenSettings: IQueenSettings = {
    satietyDrainRate: 0.1,
    initialSatiety: 5,
    maxHealth: 5,
    spawnRate: 10,
}

export function createBasicWorld(antBehavior: BehaviorList<Ant>): World {
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

    new Queen(1, cells[220], queenSettings);
    new Ant(2, cells[200], antBehavior, antSettings);
    new Ant(3, cells[450], antBehavior, antSettings);

    return new World(rows, columns, cells);
}