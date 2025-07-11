import type { IAction } from '../../types/IAction';
import type { Ant } from '../Ant';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import { CellType } from 'src/types/CellType';

export class MoveRandomly implements IAction<Ant> {
    public type = 'moveRandomly';

    constructor(public nextAction?: IAction<Ant>) {
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