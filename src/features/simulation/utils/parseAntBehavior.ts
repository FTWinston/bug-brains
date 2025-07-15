import type { IAntBehavior } from 'src/types/IAntBehavior';
import { MoveRandomly } from '../classes/actions/MoveRandomly';
import type { Ant } from '../classes/Ant';
import { IsIndoors } from '../classes/conditions/IsIndoors';
import type { IBehaviorList } from '../types/IBehaviorList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseAntBehavior(_behavior: IAntBehavior): IBehaviorList<Ant> {
    // TODO: this
    return {
        behaviors: [
            {
                id: 1,
                conditions: [
                    new IsIndoors(true),
                ],
                actions: [
                    new MoveRandomly(), 
                ],
            }
        ]
    };
}