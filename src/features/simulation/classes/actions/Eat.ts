import type { EatAction } from 'src/types/AntAction';
import type { IAction } from '../../types/IAction';
import type { Ant } from '../Ant';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';

export class Eat implements IAction<Ant> {
    static readonly type: EatAction['type'] = 'eat';
    public readonly type = Eat.type;

    constructor(public nextAction?: IAction<Ant>) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static parse(_action: EatAction): Eat {
        return new Eat();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    performStep(_entity: Ant): [boolean, SimulationUpdate[]] {
        // TODO: implement eating

        return [
            true,
            []
        ];
    }
}