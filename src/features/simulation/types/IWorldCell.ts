import type { CellType } from 'src/types/CellType';
import type { IEntity } from './IEntity';

export interface IWorldCell {
    row: number;
    col: number;
    type: CellType;

    get contents(): ReadonlySet<IEntity>;
}