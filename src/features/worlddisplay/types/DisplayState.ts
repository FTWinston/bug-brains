import type { IEntity } from 'src/types/IEntity';
import type { IWorld } from 'src/types/IWorld';

export type DisplayState = IWorld & {
    /** Entity object by ID */
    entityMap: Map<number, IEntity>;

    /** Entity cell index by ID */
    entityCells: Map<number, number>;
}