import { CellSet } from './CellSetDisplay'
import { useSimulationWorker } from '../hooks/useSimulationWorker';
import type { IWorldState } from 'src/types/IWorldState';

interface Props {
    worldIdentifier: string;
}

export const World: React.FC<Props> = (props) => {
    const world: IWorldState = useSimulationWorker(props.worldIdentifier);
    
    return (
        <CellSet
            cells={world.cells}
            columns={world.columns}
            onClick={index => console.log(`Cell clicked: ${index}`)}
        />
    )
}