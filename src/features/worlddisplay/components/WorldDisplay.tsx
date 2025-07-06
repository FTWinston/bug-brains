import { CellSet } from './CellSetDisplay'
import { useSimulationWorker } from '../hooks/useSimulationWorker';
import type { IWorld } from 'src/types/IWorld';

interface Props {
    worldIdentifier: string;
}

export const World: React.FC<Props> = (props) => {
    const world: IWorld = useSimulationWorker(props.worldIdentifier);
    
    return (
        <CellSet
            cells={world.cells}
            columns={world.columns}
            entities={world.entities}
            onClick={index => console.log(`Cell clicked: ${index}`)}
        />
    )
}