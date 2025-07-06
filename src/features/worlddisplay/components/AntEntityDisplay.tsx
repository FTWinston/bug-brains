import type { IEntityState } from 'src/types/IEntityState';
import { EntityType } from 'src/types/EntityType';
import { classNames } from 'src/utils/classNames';
import styles from './AntEntityDisplay.module.scss';

type Props = Omit<Extract<IEntityState, { type: EntityType.Ant }>, 'type'> & {
    className?: string;
};

export const AntEntity: React.FC<Props> = props => {
    const className = classNames(styles.ant, props.className, props.color ? styles[`ant--${props.color}`] : undefined);

    return <span className={className}>✱</span>;
}