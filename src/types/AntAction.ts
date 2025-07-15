export type MoveRandomlyAction = {
    type: 'move random';
}

export type EatAction = {
    type: 'eat';
}

export type AntAction = MoveRandomlyAction | EatAction;