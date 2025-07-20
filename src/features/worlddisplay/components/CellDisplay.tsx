import { Entity } from './EntityDisplay';
import { CellType } from 'src/types/CellType';
import type { IEntityState } from 'src/types/IEntityState';
import { classNames } from 'src/utils/classNames';
import styles from './CellDisplay.module.scss';
import { getScentImage } from '../utils/getScentImage';
import type { ScentType } from 'src/types/ScentType';

export interface CellData {
    cellType: CellType;
    scents?: Partial<Record<ScentType, number>>;
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

    let style: React.CSSProperties | undefined = props.gridColumn !== undefined || props.gridRow !== undefined
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

    if (props.scents) {
        if (!style) {
            style = {};
        }
        
        style.backgroundImage = Object.entries(props.scents)
            .map(([scent, strength]) => `url(${getScentImage(parseInt(scent) as ScentType, strength!)})`)
            .join(', ');
    }

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