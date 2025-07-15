import type { IAction } from '../../types/IAction';
import type { Ant } from '../Ant';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import { CellType } from 'src/types/CellType';
import type { MoveRandomlyAction } from 'src/types/AntAction';

export class MoveRandomly implements IAction<Ant> {
    static readonly type: MoveRandomlyAction['type'] = 'move random';
    public readonly type = MoveRandomly.type;

    constructor(public nextAction?: IAction<Ant>) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static parse(_action: MoveRandomlyAction): MoveRandomly {
        return new MoveRandomly();
    }

    performStep(entity: Ant): [boolean, SimulationUpdate[]] {
        const possibleDestinationCells =  entity.location.adjacentCells
            .filter(cell => cell !== null && cell.type !== CellType.SolidWall);

        const newCell = entity.random.pick(possibleDestinationCells)!;

        const moveUpdate = entity.moveTo(newCell);

        return [
            false, // This action never completes on its own, there's always scope to continue to move randomly.
            moveUpdate ? [moveUpdate] : []
        ];
    }
}