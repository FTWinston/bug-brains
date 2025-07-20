import type { CellType } from './CellType';
import type { IEntityState } from './IEntityState';
import type { ScentType } from './ScentType';

export interface ICellState {
    type: CellType;
    contents?: IEntityState[];
    scents: Partial<Record<ScentType, number>>;
}