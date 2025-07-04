import type { IActor } from '../types/IActor';
import type { IAction } from '../types/IAction';
import type { IBehaviorList } from '../types/IBehaviorList';
import { Entity } from './Entity';
import type { WorldCell } from './WorldCell';

export abstract class ActorBase extends Entity implements IActor {
    constructor(id: number, location: WorldCell) {
        super(id, location);
    }

    abstract act(): void;
}

export abstract class Actor<TActor extends Actor<TActor>> extends ActorBase {
    constructor(id: number, location: WorldCell, behaviors: IBehaviorList<TActor>) {
        super(id, location)
        this.behaviors = behaviors;
    }

    behaviors: IBehaviorList<TActor>;
    currentAction?: IAction<TActor>;
    
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