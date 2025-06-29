import type { IActor } from './IActor';
import type { Behavior } from './Behavior';

/** A condition that may or may not be satisfied for a particular actor. */
export interface Condition<TActor extends IActor> {
    type: string;
    behavior: Behavior<TActor>;
    isSatisfied(entity: TActor): boolean;
}