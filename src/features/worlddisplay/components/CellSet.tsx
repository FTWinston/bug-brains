import type { CellType } from 'src/types/CellType';
import { Cell, type CellData } from './Cell';
import styles from './CellSet.module.scss';

interface Props {
    columns: number;
    cells: CellType[];
    entities: Record<number, CellData['contents']>;
    onClick?: (index: number) => void;
}

const cellWidth = 2.3094;
const cellHeight = 2;
const gapSize = 0.0125;

export const CellSet: React.FC<Props> = props => {
    const { columns, cells, onClick } = props;
    const rows = Math.ceil(cells.length / columns);

    const contents = cells.map((cellType, index) => {
        if (cellType === null) {
            return null;
        }
        
        let row = Math.floor(index / columns) * 2 + 1;
        let col = (index % columns);

        if (col % 2 === 0) {
            row += 1;
        }
        col = col * 2 + 1;

        const wrapperStyle: React.CSSProperties = {
            gridColumn: `${col} / span 3`,
            gridRow: `${row} / span 2`,
        };

        const cellContents  = props.entities[index];
        
        return (
                <Cell
                    key={index}
                    style={wrapperStyle}
                    cellType={cellType}
                    contents={cellContents}
                    onClick={onClick ? () => onClick(index) : undefined}
                />
        )
    });
    
    /*
    const cellSizeLimitByWidth = `calc(100vw / ${columns * 1.94})`;
    const cellSizeLimitByHeight = `calc((100svh - 5rem) / ${rows - 0.25} / ${cellHeight + gapSize})`;
    const containerStyle2: React.CSSProperties = {
        fontSize: `min(${cellSizeLimitByWidth}, ${cellSizeLimitByHeight}, 20rem)`,
    };
    */

    const containerStyle: React.CSSProperties = {
        gridTemplateColumns: `repeat(${columns}, calc(${cellWidth * 0.25 + gapSize * 0.5}em) calc(${cellWidth * 0.5 + gapSize}em) ) calc(${cellWidth * 0.25 + gapSize * 0.5}em)`,
        gridTemplateRows: `repeat(${rows * 2}, ${cellHeight / 2 + gapSize}em)`,
    };

    return (
        <div className={styles.root}>
            <div className={styles.cells} style={containerStyle}>
                {contents}
            </div>
        </div>
    );
}
