import type { AntBehaviorList } from './AntBehavior';

type InitAction = {
    type: 'init';
    id: string;
    behavior: AntBehaviorList;
}

type BehaviorAction = {
    type: 'behavior';
    behavior: AntBehaviorList;
}

export type WorldDisplayAction = InitAction | BehaviorAction;
