import type { IAntBehavior } from './IAntBehavior';

type InitAction  = {
    type: 'init';
    id: string;
    behavior: IAntBehavior;
}

export type WorldDisplayAction = InitAction;
