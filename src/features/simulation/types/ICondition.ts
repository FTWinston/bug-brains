import type { IActor } from './IActor';
import type { IBehavior } from './IBehavior';

/** A condition that may or may not be satisfied for a particular actor. */
export interface ICondition<TActor extends IActor> {
    type: string;
    behavior: IBehavior<TActor>;
    isSatisfied(entity: TActor): boolean;
}