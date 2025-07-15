import { useEffect, useReducer, useRef } from 'react';
import type { DisplayState } from '../types/DisplayState';
import type { IWorldState } from 'src/types/IWorldState';
import { displayReducer } from '../utils/displayReducer';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import type { AntBehaviorList } from 'src/types/AntBehavior';

const createEmptyState: () => DisplayState = () => ({
    columns: 0,
    cells: [],
    entityCells: {},
});

export function useSimulationWorker(worldIdentifier: string, behavior: AntBehaviorList): IWorldState {
    const [state, update] = useReducer(displayReducer, undefined, createEmptyState)

    const workerRef = useRef<Worker>(null);

    const identifierRef = useRef<string>(null);
    
    // If the behavior changes, send a message to the worker to update it.
    // (Only if the world identifier hasn't changed, because if it has, the world will be re-initialized.)
    useEffect(() => {
        if (worldIdentifier === identifierRef.current) {
            workerRef.current?.postMessage({
                type: 'behavior',
                behavior,
            });
        }
    }, [behavior]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // Save the world identifier, so the useEffect that looks for changes to behavior can tell
        // that the identifier hasn't changed. (If it has, the world will be re-initialized.)
        identifierRef.current = worldIdentifier;

        // Create a new web worker for the simulation.
        const worker = new Worker(new URL('../../simulation/simulationWorker', import.meta.url), { type: 'module' });
        workerRef.current = worker;

        // Pass messages from the worker straight to the reducer.
        const handleMessage = (event: MessageEvent<SimulationUpdate[]>) => update(event.data);
        worker.addEventListener('message', handleMessage);
        
        // Send a message to the worker, telling it which world to initialize.
        worker.postMessage({
            type: 'init',
            id: worldIdentifier,
            behavior,
        });
        
        // Remove the event listener and terminate the worker when this component unmounts.
        return () => {
            worker.removeEventListener('message', handleMessage);
            worker.terminate();
        };
    }, [worldIdentifier]); // eslint-disable-line react-hooks/exhaustive-deps

    return state;
}