import type { ICellState } from './ICellState';

export interface IWorldState {
    columns: number;
    cells: ICellState[];
}