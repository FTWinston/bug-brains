import type { SimulationAction } from 'src/types/SimulationAction';
import type { DisplayState } from '../types/DisplayState';
import type { IEntity } from 'src/types/IEntity';

function assertNever(x: never, desc: string): never {
    throw new Error(`Unhandled ${desc} type: ${(x as SimulationAction).type}`);
}

export function displayReducer(state: DisplayState, action: SimulationAction): DisplayState {
    switch (action.type) {
        case 'init': {
            state = {
                cells: action.world.cells,
                columns: action.world.columns,
                entities: action.world.entities,
                entityCells: new Map<number, number>(),
                entityMap: new Map<number, IEntity>(),
            };

            for (const [cellIndex, entities] of Object.entries(state.entities)) {
                const cellIndexNumber = parseInt(cellIndex);

                for (const entity of entities) {
                    // Store the entity by ID.
                    state.entityMap.set(entity.id, entity);

                    // Store the cell index for the entity.
                    state.entityCells.set(entity.id, cellIndexNumber);   
                }
            }

            return state;
        }

        case 'update': {
            let recreatedCells = false;

            for (const event of action.events) {
                switch (event.type) {
                    case 'cell':
                        if (!recreatedCells) {
                            // We only need to recreate the cells array once.
                            recreatedCells = true;
                            
                            state = {
                                ...state,
                                cells: [...state.cells],
                            };
                        }

                        state.cells[event.i] = event.cellType;
                        break;

                    case 'add':
                    case 'rem':
                    case 'upd':
                        /*
                        const targetEntity = state.entityMap.get(action.id);

                        // TODO: determine whether maps are really ok to update (rather than replace) in the reducer here.

                        // TODO: and can we get away with only one map, instead of two?

                        // TODO: maybe moving an entity should be a separate action?

                        if (action.cell !== undefined) {
                            // Entity moves to a different cell.
                            const oldCell = state.entityCells.get(action.id);

                            state.entityCells.set(action.id, action.cell);

                            // TODO: also remove it from state.entities for its old cell, and put it into its new cell.
                        }
                        */

                        // TODO: overwrite any other properties of the entity that are on the action.

                        // TODO: update what we save.
                        break;
                    default:
                        assertNever(event, 'update event');
                }
            }

            return state;
        }
            
        default:
            assertNever(action, 'action');
    }
}