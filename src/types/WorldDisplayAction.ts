import type { IAntBehavior } from './IAntBehavior';

type InitAction = {
    type: 'init';
    id: string;
    behavior: IAntBehavior;
}

type BehaviorAction = {
    type: 'behavior';
    behavior: IAntBehavior;
}

export type WorldDisplayAction = InitAction | BehaviorAction;
