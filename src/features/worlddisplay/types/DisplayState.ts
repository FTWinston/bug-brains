import type { IWorldState } from 'src/types/IWorldState';

export type DisplayState = IWorldState & {
    /** Entity cell index by ID */
    entityCells: Record<number, number>;
}