import type { CellType } from './CellType';
import type { IEntityState, IEntitySpecific } from './IEntityState';

type ResetUpdate = {
    type: 'reset';
    columns: number;
    cells: CellType[];
}

type CellUpdate = {
    type: 'cell';
    i: number;
    cellType: CellType;
}

type AddEntityUpdate = {
    type: 'add';
    loc: number;
    entity: IEntityState;
}

type RemoveEntityUpdate = {
    type: 'rem';
    id: number;
}

type MoveEntityUpdate = {
    type: 'mov';
    id: number;
    loc: number;
}

type UpdateEntityUpdate = {
    type: 'upd';
    id: number;
    ent: Partial<IEntitySpecific>;
}

export type SimulationUpdate = ResetUpdate | CellUpdate | AddEntityUpdate | RemoveEntityUpdate | MoveEntityUpdate | UpdateEntityUpdate;
