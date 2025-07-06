import { Entity } from './EntityDisplay';
import { CellType } from 'src/types/CellType';
import type { IEntityState } from 'src/types/IEntityState';
import { classNames } from 'src/utils/classNames';
import styles from './CellDisplay.module.scss';

export interface CellData {
    cellType: CellType;
    contents?: IEntityState[],
}

interface Props extends CellData{
    gridColumn?: number;
    gridRow?: number;
    onClick?: () => void;
}

export const Cell: React.FC<Props> = props => {
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

    const style: React.CSSProperties | undefined = props.gridColumn !== undefined || props.gridRow !== undefined
        ? {
            gridColumnStart: props.gridColumn,
            gridRowStart: props.gridRow,
        }
        : undefined;

    const contents = props.contents?.map((entity) => (
        <Entity
            key={entity.id}
            {...entity}
        />
    ));

    return (
        <div
            className={classNames(styles.cell, cellTypeStyle)}
            onClick={props.onClick}
            style={style}
        >
            {contents}
        </div>
    );
}