import styles from './Cell.module.scss';
import { Entity } from './Entity';
import { CellType } from 'src/types/CellType';
import type { EntityInfo } from 'src/types/EntityInfo';
import { classNames } from 'src/utils/classNames';

export interface CellData {
    cellType: CellType;
    contents?: EntityInfo[],
}

interface Props extends CellData{
    style?: React.CSSProperties;
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

    let contents = props.contents?.map((entity) => (
        <Entity
            key={entity.id}
            {...entity}
        />
    ));

    return (
        <div
            className={classNames(styles.cell, cellTypeStyle)}
            onClick={props.onClick}
            style={props.style}
        >
            {contents}
        </div>
    );
}