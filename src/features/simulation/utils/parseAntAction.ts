import { MoveRandomly } from '../classes/actions/MoveRandomly';
import type { Ant } from '../classes/Ant';
import type { AntAction } from 'src/types/AntAction';
import type { IAction } from '../types/IAction';
import { assertNever } from 'src/utils/assertNever';
import { Eat } from '../classes/actions/Eat';

export function parseAntAction(action: AntAction): IAction<Ant> {
    switch (action.type) {
        case MoveRandomly.type:
            return MoveRandomly.parse(action);
        case Eat.type:
            return Eat.parse(action);
        default:
            assertNever(action, 'action');
    }
}