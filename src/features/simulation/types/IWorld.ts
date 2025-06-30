import type { IWorldCell } from './IWorldCell';

export interface IWorld {
    readonly width: number;
    readonly height: number;
    get cells(): ReadonlySet<IWorldCell>;
}