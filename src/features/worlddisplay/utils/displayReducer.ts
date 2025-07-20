import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import type { DisplayState } from '../types/DisplayState';
import type { IEntityState } from 'src/types/IEntityState';
import type { ICellState } from 'src/types/ICellState';

function assertNever(x: never): never {
    throw new Error(`Unhandled action type: ${(x as SimulationUpdate).type}`);
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

export function displayReducer(state: DisplayState, updates: SimulationUpdate[]): DisplayState {
    // On the assumption that any update will modify at least one cell, recreate the state and cells array now,
    // to avoid redoing it for each action. (This is superfluous for the reset action.)
    state = {
        ...state,
        cells: [...state.cells],
    };

    let changedEntityCells = false;

    for (const update of updates) {
        switch (update.type) {
            // Reset the map of cells, and clear all entities.
            case 'reset': {
                state = {
                    cells: update.cells
                        .map(cellType => ({
                            type: cellType,
                            scents: {},
                        })),
                    columns: update.columns,
                    entityCells: {},
                };
                break;
            }

            // Change the type of a cell.
            case 'cell': {
                const existingCell = state.cells[update.i];

                state.cells[update.i] = {
                    ...existingCell,
                    type: update.cellType,
                };
                break;
            }

            case 'add': {
                // Add a new entity to entityCells, and also to the specified cell's content.
                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                state.entityCells[update.entity.id] = update.loc;
                addToCellContents(state, update.loc, update.entity);
                break;
            }

            case 'rem': {
                // Remove the entity from entityCells, and also from it's current cell's content.
                const cellIndex = state.entityCells[update.id];

                if (cellIndex === undefined) {
                    break;
                }

                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                delete state.entityCells[update.id];
                removeFromCellContents(state, cellIndex, update.id);
                break;
            }
            
            case 'mov': {
                // Overwrite the entity in entityCells, remove it from its existing cell's content, and add it to the specified cell's content.
                const cellIndex = state.entityCells[update.id];

                if (cellIndex === undefined) {
                    break;
                }

                if (!changedEntityCells) {
                    changedEntityCells = true;
                    state.entityCells = {...state.entityCells};
                }

                state.entityCells[update.id] = update.loc;
                const entity = removeFromCellContents(state, cellIndex, update.id);
                if (entity) {
                    addToCellContents(state, update.loc, entity);
                }
                break;
            }

            case 'upd': {
                // Ovewrite any properties of the specified entity, except for its id, type and the cell it's in.
                const cellIndex = state.entityCells[update.id];

                if (cellIndex === undefined) {
                    break;
                }

                updateInCellContents(state, cellIndex, update.id, update.ent);
                break;
            }

            case 'sce': {
                // Reassign cell and cell's scents.
                const cell = { ...state.cells[update.loc] };
                state.cells[update.loc] = cell;
                cell.scents = { ...cell.scents }

                // Remove this scent from the cell, or update its strength if non-zero.
                if (update.str <= 0) {
                    delete cell.scents[update.scent];
                } else {
                    cell.scents[update.scent] = update.str;
                }
                break;
            }
                
            default:
                assertNever(update);
        }
    }

    return state;
}