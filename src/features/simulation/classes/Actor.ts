import type { IActor } from '../types/IActor';
import type { IAction } from '../types/IAction';
import type { BehaviorList } from '../types/BehaviorList';
import { Entity } from './Entity';
import type { WorldCell } from './WorldCell';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import type { IBehavior } from '../types/IBehavior';
import type { IActorSettings } from '../types/IActorSettings';

export abstract class ActorBase extends Entity implements IActor {
    constructor(id: number, location: WorldCell, private readonly settings: IActorSettings) {
        super(id, location);
        this._health = this.settings.maxHealth;
        this._satietyLevel = this.settings.initialSatiety;
    }

    private _health: number;
    private _satietyLevel: number;

    public get health() {
        return this._health;
    }

    public hurt(healthDrainAmount: number) {
        this._health -= healthDrainAmount;

        if (this._health < 0) {
            this._health = 0; // Ensure health does not go below zero.

            // TODO: Trigger death logic here, if needed.
        }
    }

    /** How much food is in the stomach. 0 means starving. Health drains immediately. */
    public get satietyLevel() {
        return this._satietyLevel;
    }

    public eat(foodQuantity: number) {
        this._satietyLevel += foodQuantity;
    }

    protected update() {
        this._satietyLevel -= this.settings.satietyDrainRate;

        if (this._satietyLevel < 0) {
            this._satietyLevel = 0;

            this.hurt(this.settings.satietyDrainRate);
        }
    }

    abstract act(): SimulationUpdate[];
}

export abstract class Actor<TActor extends Actor<TActor>, TSettings extends IActorSettings = IActorSettings> extends ActorBase {
    constructor(id: number, location: WorldCell, behaviors: BehaviorList<TActor>, settings: TSettings) {
        super(id, location, settings)
        this.behaviors = behaviors;
    }

    behaviors: BehaviorList<TActor>;
    currentBehavior?: IBehavior<TActor>;
    currentAction?: IAction<TActor>;

    act(): SimulationUpdate[] {
        this.update();

        if (this.health <= 0) {
            return []; // An actor that is dead does not act. (But we should have a dying update, right?)
        }

        for (const behavior of this.behaviors) {
            if (behavior.conditions.some(condition => !condition.isSatisfied(this as unknown as TActor))) {
                continue; // Skip this behavior if any condition is not satisfied.
            }

            // If already performing an action from this behaviour, stick with that.
            if (this.currentBehavior?.id !== behavior.id || this.currentAction === undefined) {
                // Otherwise, start with the behaviour's first action.
                this.currentBehavior = behavior;
                this.currentAction = behavior.actions[0];
            }

            // Perform the action. This returns whether it has completed, and an array of simulation updates that occurred.
            const [actionIsComplete, updates] = this.currentAction.performStep(this as unknown as TActor);

            if (actionIsComplete) {
                // If it is complete, move on to the next action, or the first action if this was the last.
                this.currentAction = this.currentAction.nextAction ?? behavior.actions[0];
            }

            return updates;
        }

        return [];
    }

    replaceBehavior(behaviors: BehaviorList<TActor>): void {
        this.behaviors = behaviors;

        // Reset the current behavior and action, so the actor will start with the first action of the new behavior.
        this.currentBehavior = undefined;
        this.currentAction = undefined;
    }
}