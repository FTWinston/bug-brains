import { World } from '../classes/World';
import { WorldCell } from '../classes/WorldCell';
import { CellType } from '../types/CellType';
import { indexFromCoordinate } from 'src/utils/coordinates';

export function createBasicWorld() {
    const rows = 30;
    const columns = 30;

    const cells: Array<WorldCell> = new Array(rows * columns);
    
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            cells[indexFromCoordinate({ col, row }, columns)] = new WorldCell(row, col, CellType.UndergroundSpace);
        }
    }

    return new World(rows, columns, cells);
}