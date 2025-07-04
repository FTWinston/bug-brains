import type { CellType } from './CellType';
import type { IEntity } from './IEntity';

export interface IWorld {
    columns: number;
    cells: CellType[];
    entities: Record<number, IEntity[]>;
}