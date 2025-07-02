import type { PropsWithChildren } from 'react';
import type { CellType } from 'src/features/simulation/types/CellType';
import styles from './Cell.module.scss';

export enum Special {
    Highlight = 1,
    Error = 2,
}

interface Props {
    cellType: CellType;
    onClick?: () => void;
}

export const Cell: React.FC<PropsWithChildren<Props>> = props => {
    let content: React.ReactNode;

    if (props.children) {
        content = props.children;
    }

    return (
        <div
            className={styles.cell}
            onClick={props.onClick}
        >
            {content}
        </div>
    );
}