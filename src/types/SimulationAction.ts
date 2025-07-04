import type { CellType } from './CellType';
import type { IEntity, IEntitySpecific } from './IEntity';
import type { IWorld } from './IWorld';

type InitAction = {
    type: 'init';
    world: IWorld;
}

type UpdateAction = {
    type: 'update';
    events: UpdateEvent[]
}

type CellEvent = {
    type: 'cell';
    i: number;
    cellType: CellType;
}

type AddEntityEvent = {
    type: 'add';
    loc: number;
    entity: IEntity;
}

type RemoveEntityEvent = {
    type: 'rem';
    id: number;
}

type UpdateEntityEvent = {
    type: 'upd';
    id: number;
    ent: Partial<IEntitySpecific>;
}

export type UpdateEvent = CellEvent | AddEntityEvent | RemoveEntityEvent | UpdateEntityEvent;

export type SimulationAction = InitAction | UpdateAction;