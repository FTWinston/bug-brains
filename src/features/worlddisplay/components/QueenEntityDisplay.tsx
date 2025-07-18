import type { IEntityState } from 'src/types/IEntityState';
import { EntityType } from 'src/types/EntityType';
import { classNames } from 'src/utils/classNames';
import styles from './QueenEntityDisplay.module.scss';

type Props = Omit<Extract<IEntityState, { type: EntityType.Queen }>, 'type'> & {
    className?: string;
};

export const QueenEntity: React.FC<Props> = props => {
    const className = classNames(styles.queen, props.className);

    return <span className={className}>♛</span>;
}