import type { CellType } from './CellType';
import type { IEntityState, IEntitySpecific } from './IEntityState';

type ResetAction = {
    type: 'reset';
    columns: number;
    cells: CellType[];
}

type CellAction = {
    type: 'cell';
    i: number;
    cellType: CellType;
}

type AddEntityAction = {
    type: 'add';
    loc: number;
    entity: IEntityState;
}

type RemoveEntityAction = {
    type: 'rem';
    id: number;
}

type MoveEntityAction = {
    type: 'mov';
    id: number;
    loc: number;
}

type UpdateEntityAction = {
    type: 'upd';
    id: number;
    ent: Partial<IEntitySpecific>;
}

export type SimulationAction = ResetAction | CellAction | AddEntityAction | RemoveEntityAction | MoveEntityAction | UpdateEntityAction;
