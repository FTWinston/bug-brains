import type { PropsWithChildren } from 'react';
import { CellType } from 'src/features/simulation/types/CellType';
import styles from './Cell.module.scss';

interface Props {
    cellType: CellType;
    onClick?: () => void;
}

export const Cell: React.FC<PropsWithChildren<Props>> = props => {
    let typeStyle: string;
    switch (props.cellType) {
        case CellType.UndergroundSpace:
            typeStyle = styles.undergroundSpace;
            break;
        case CellType.OutdoorSpace:
            typeStyle = styles.outdoorSpace;
            break;
        case CellType.SolidWall:
            typeStyle = styles.solidWall;
            break;
    }

    return (
        <div
            className={`${styles.cell} ${typeStyle}`}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}