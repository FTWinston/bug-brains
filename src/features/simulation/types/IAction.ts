import type { IActor } from './IActor';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';

/** Something that can be performed by a given entity. performStep returns true if the action is considered "complete" after performing a step. */
export interface IAction<TActor extends IActor> {
    type: string;
    nextAction?: IAction<TActor>;
    performStep(entity: TActor): [boolean, SimulationUpdate[]];
}