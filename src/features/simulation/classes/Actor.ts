import type { IActor } from '../types/IActor';
import type { Action } from '../types/Action';
import type { BehaviorList } from '../types/BehaviorList';

export class Actor<TActor extends Actor<TActor>> implements IActor {
    constructor(behaviors: BehaviorList<TActor>) {
        this.behaviors = behaviors;
    }

    behaviors: BehaviorList<TActor>;
    currentAction?: Action<TActor>;
    
    act() {
        for (const behavior of this.behaviors.behaviors) {
            if (behavior.conditions.some(condition => !condition.isSatisfied(this as unknown as TActor))) {
                continue; // Skip this behavior if any condition is not satisfied.
            }

            // If already performing an action from this behaviour, stick with that.
            if (this.currentAction?.behavior.id !== behavior.id) {
                // Otherwise, start with the behaviour's first action.
                this.currentAction = behavior.actions[0];
            }

            // Perform the action.
            if (this.currentAction.performStep(this as unknown as TActor)) {
                // If it is complete, move on to the next action, or the first action if this was the last.
                this.currentAction = this.currentAction.nextAction ?? behavior.actions[0];
            }
        }
    }
}