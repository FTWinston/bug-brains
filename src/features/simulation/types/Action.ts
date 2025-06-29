import type { Behavior } from './Behavior';
import type { IActor } from './IActor';

/** Something that can be performed by a given entity. performStep returns true if the action is considered "complete" after performing a step. */
export interface Action<TActor extends IActor> {
    type: string;
    behavior: Behavior<TActor>;
    nextAction?: Action<TActor>;
    performStep(entity: TActor): boolean;
}