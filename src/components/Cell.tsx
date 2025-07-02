import type { PropsWithChildren } from 'react';
import { CellType } from 'src/features/simulation/types/CellType';
import styles from './Cell.module.scss';
import { classNames } from 'src/utils/classNames';

export interface CellData {
    cellType: CellType;
    antColor?: string;
}

interface Props extends CellData{
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const Cell: React.FC<PropsWithChildren<Props>> = props => {
    let cellTypeStyle: string | undefined;
    switch (props.cellType) {
        case CellType.UndergroundSpace:
            cellTypeStyle = styles.cellUndergroundSpace;
            break;
        case CellType.OutdoorSpace:
            cellTypeStyle = styles.cellOutdoorSpace;
            break;
        case CellType.SolidWall:
            cellTypeStyle = styles.cellSolidWall;
            break;
    }

    let antTypeStyle: string | undefined;
    switch (props.antColor) {
        case 'red':
            antTypeStyle = styles.antRed;
            break;
        case 'blue':
            antTypeStyle = styles.antBlue;
            break;
    }

    return (
        <div
            className={classNames(styles.cell, cellTypeStyle, antTypeStyle)}
            onClick={props.onClick}
            style={props.style}
        >
            {props.antColor && '✱'}
        </div>
    );
}