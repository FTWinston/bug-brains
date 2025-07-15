import type { IActor } from './IActor';
import type { IBehavior } from './IBehavior';

/** A sequence of behaviours, from highest to lowest priority. */
export type BehaviorList<TActor extends IActor> = IBehavior<TActor>[];