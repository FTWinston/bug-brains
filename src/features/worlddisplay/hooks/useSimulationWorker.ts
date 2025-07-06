import { useEffect, useReducer } from 'react';
import type { DisplayState } from '../types/DisplayState';
import type { IWorld } from 'src/types/IWorld';
import { displayReducer } from '../utils/displayReducer';
import type { SimulationAction } from 'src/types/SimulationAction';
import type { IEntity } from 'src/types/IEntity';

const getEmptyState: () => DisplayState = () => ({
    columns: 0,
    cells: [],
    entities: {},
    entityMap: new Map<number, IEntity>(),
    entityCells: new Map<number, number>(),
});

export function useSimulationWorker(worldIdentifier: string): IWorld {
    const [state, update] = useReducer(displayReducer, undefined, getEmptyState)
    
    useEffect(() => {
        // Create a new Web Worker for the simulation.
        const worker = new Worker(new URL('../../features/simulation/simulationWorker', import.meta.url));

        // Pass messages from the worker straight to the reducer.
        const handleMessage = (event: MessageEvent<SimulationAction>) => update(event.data);
        worker.addEventListener('message', handleMessage);
        
        // Send a message to the worker, telling it which world to initialize.
        worker.postMessage({ type: 'init', worldIdentifier });
        
        // Remove the event listener and terminate the worker when this component unmounts.
        return () => {
            worker.removeEventListener('message', handleMessage);
            worker.terminate();
        };
    }, [worldIdentifier]);

    return state;
}