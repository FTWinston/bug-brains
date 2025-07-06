import type { CellType } from './CellType';
import type { IEntityState } from './IEntityState';

export interface ICellState {
    type: CellType;
    contents?: IEntityState[];
}