import type { IBehavior } from './IBehavior';
import type { IActor } from './IActor';

/** Something that can be performed by a given entity. performStep returns true if the action is considered "complete" after performing a step. */
export interface IAction<TActor extends IActor> {
    type: string;
    behavior: IBehavior<TActor>;
    nextAction?: IAction<TActor>;
    performStep(entity: TActor): boolean;
}