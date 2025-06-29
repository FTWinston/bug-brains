import type { IWorldCell } from './IWorldCell';

export interface IWorld {
    get cells(): ReadonlySet<IWorldCell>;
}