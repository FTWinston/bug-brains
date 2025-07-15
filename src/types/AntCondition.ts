export type IndoorsCondition = {
    type: 'indoors';
    is: boolean;
}

export type IsolatedCondition = {
    type: 'isolated';
    distance: number;
}

export type AntCondition = IndoorsCondition | IsolatedCondition;