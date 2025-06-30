import type { IEntity } from './IEntity';

/** Something is associated with a behaviour tree and performs actions. */
export interface IActor extends IEntity {
    act(): void;
}