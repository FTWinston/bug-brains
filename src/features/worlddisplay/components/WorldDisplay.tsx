import { CellSet } from './CellSetDisplay'
import { useSimulationWorker } from '../hooks/useSimulationWorker';
import type { IWorldState } from 'src/types/IWorldState';
import type { IAntBehavior } from 'src/types/IAntBehavior';

interface Props {
    worldIdentifier: string;
    behavior: IAntBehavior;
}

export const World: React.FC<Props> = (props) => {
    const world: IWorldState = useSimulationWorker(props.worldIdentifier, props.behavior);
    
    return (
        <CellSet
            cells={world.cells}
            columns={world.columns}
            onClick={index => console.log(`Cell clicked: ${index}`)}
        />
    )
}