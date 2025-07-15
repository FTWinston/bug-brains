import type { IActor } from './IActor';;

/** A condition that may or may not be satisfied for a particular actor. */
export interface ICondition<TActor extends IActor> {
    readonly type: string;
    isSatisfied(entity: TActor): boolean;
}