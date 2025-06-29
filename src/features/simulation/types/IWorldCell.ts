import type { CellType } from './CellType';
import type { IEntity } from './IEntity';

export interface IWorldCell {
    x: number;
    y: number;
    type: CellType;

    get contents(): ReadonlySet<IEntity>;
}