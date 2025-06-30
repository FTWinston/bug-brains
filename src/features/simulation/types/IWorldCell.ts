import type { CellType } from './CellType';
import type { IEntity } from './IEntity';

export interface IWorldCell {
    row: number;
    col: number;
    type: CellType;

    get contents(): ReadonlySet<IEntity>;
}