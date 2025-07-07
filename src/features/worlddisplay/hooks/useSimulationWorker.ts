import { useEffect, useReducer } from 'react';
import type { DisplayState } from '../types/DisplayState';
import type { IWorldState } from 'src/types/IWorldState';
import { displayReducer } from '../utils/displayReducer';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';

const createEmptyState: () => DisplayState = () => ({
    columns: 0,
    cells: [],
    entityCells: {},
});

export function useSimulationWorker(worldIdentifier: string): IWorldState {
    const [state, update] = useReducer(displayReducer, undefined, createEmptyState)
    
    useEffect(() => {
        // Create a new Web Worker for the simulation.
        const worker = new Worker(new URL('../../features/simulation/simulationWorker', import.meta.url));

        // Pass messages from the worker straight to the reducer.
        const handleMessage = (event: MessageEvent<SimulationUpdate[]>) => update(event.data);
        worker.addEventListener('message', handleMessage);
        
        // Send a message to the worker, telling it which world to initialize.
        worker.postMessage({ type: 'init', worldIdentifier },);
        
        // Remove the event listener and terminate the worker when this component unmounts.
        return () => {
            worker.removeEventListener('message', handleMessage);
            worker.terminate();
        };
    }, [worldIdentifier]);

    return state;
}