import type { AntBehaviorList } from 'src/types/AntBehavior';
import type { Ant } from '../classes/Ant';
import type { BehaviorList } from '../types/BehaviorList';
import { parseAntAction } from './parseAntAction';
import { parseAntCondition } from './parseAntCondition';

export function parseAntBehavior(behaviors: AntBehaviorList): BehaviorList<Ant> {
    return behaviors.map(behavior => {  
        const parsedBehavior = {
            id: behavior.id,
            conditions: behavior.conditions.map(parseAntCondition),
            actions: behavior.actions.map(parseAntAction),
        };
        
        for (let i = 0; i < parsedBehavior.actions.length - 1; i++) {
            parsedBehavior.actions[i].nextAction = parsedBehavior.actions[i + 1];
        }

        return parsedBehavior;
    });
}