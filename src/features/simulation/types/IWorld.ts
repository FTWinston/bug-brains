import type { IWorldCell } from './IWorldCell';

export interface IWorld {
    readonly rows: number;
    readonly columns: number;
    get cells(): ReadonlySet<IWorldCell>;
}