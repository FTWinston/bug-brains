import type { SimulationAction } from 'src/types/SimulationAction';
import type { DisplayState } from '../types/DisplayState';
import type { IEntityState } from 'src/types/IEntityState';
import type { ICellState } from 'src/types/ICellState';

function assertNever(x: never): never {
    throw new Error(`Unhandled action type: ${(x as SimulationAction).type}`);
}

function addToCellContents(state: DisplayState, cellIndex: number, entity: IEntityState) {
    const existingCell = state.cells[cellIndex];
    state.cells[cellIndex] = {
        ...existingCell,
        contents: existingCell.contents
            ? [...existingCell.contents, entity]
            : [entity],
    };
}

function removeFromCellContents(state: DisplayState, cellIndex: number, entityId: number): IEntityState | undefined {
    const existingCell = state.cells[cellIndex];

    const entity = existingCell.contents?.find(ent => ent.id === entityId);
    if (entity === undefined) {
        return undefined;
    }

    const newCell: ICellState = {
        ...existingCell,
        contents: existingCell.contents?.filter(ent => ent !== entity),
    };

    if (newCell.contents?.length === 0) {
        delete newCell.contents;
    }

    state.cells[cellIndex] = newCell;
    return entity;
}


function updateInCellContents(state: DisplayState, cellIndex: number, entityId: number, updateData: Omit<IEntityState, 'id' | 'type'>) {
    const existingCell = state.cells[cellIndex];
    const existingEntity = existingCell.contents?.find(ent => ent.id === entityId);
    if (existingEntity === undefined) {
        return undefined;
    }

    const newEntity = {
        id: existingEntity.id,
        type: existingEntity.type,
        ...updateData,
    } as IEntityState;

    const newCell: ICellState = {
        ...existingCell,
        contents: existingCell.contents?.map(ent => ent === existingEntity ? newEntity : ent),
    };

    state.cells[cellIndex] = newCell;
    return existingEntity;
}

export function displayReducer(state: DisplayState, actions: SimulationAction[]): DisplayState {
    // On the assumption that any action will modify a cell, recreate the state and cells array now,
    // to avoid redoing it for each action. (This is superfluous for the reset action.)
    state = {
        ...state,
        cells: [...state.cells],
    };

    let changedEntityCells = false;

    for (const action of actions) {
        switch (action.type) {
            // Reset the map of cells, and clear all entities.
            case 'reset': {
                state = {
                    cells: action.cells
                        .map(cellType => ({
                            type: cellType
                        })),
                    columns: action.columns,
                    entityCells: {},
                };
                break;
            }

            // Change the type of a cell.
            case 'cell': {
                const existingCell = state.cells[action.i];

                state.cells[action.i] = {
                    ...existingCell,
                    type: action.cellType,
                };
                break;
            }

            case 'add': {
                // Add a new entity to entityCells, and also to the specified cell's content.
                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                state.entityCells[action.entity.id] = action.loc;
                addToCellContents(state, action.loc, action.entity);
                break;
            }

            case 'rem': {
                // Remove the entity from entityCells, and also from it's current cell's content.
                const cellIndex = state.entityCells[action.id];

                if (cellIndex === undefined) {
                    break;
                }

                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                delete state.entityCells[action.id];
                removeFromCellContents(state, cellIndex, action.id);
                break;
            }
            
            case 'mov': {
                // Overwrite the entity in entityCells, remove it from its existing cell's content, and add it to the specified cell's content.
                const cellIndex = state.entityCells[action.id];

                if (cellIndex === undefined) {
                    break;
                }

                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                state.entityCells[action.id] = action.loc;
                const entity = removeFromCellContents(state, cellIndex, action.id);
                if (entity) {
                    addToCellContents(state, action.loc, entity);
                }
                break;
            }

            case 'upd': {
                // Ovewrite any properties of the specified entity, except for its id, type and the cell it's in.
                const cellIndex = state.entityCells[action.id];

                if (cellIndex === undefined) {
                    break;
                }

                updateInCellContents(state, cellIndex, action.id, action.ent);
                break;
            }
                
            default:
                assertNever(action);
        }
    }

    return state;
}