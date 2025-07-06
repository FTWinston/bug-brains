import type { IEntity } from 'src/types/IEntity';
import { EntityType } from 'src/types/EntityType';
import { classNames } from 'src/utils/classNames';
import styles from './AntEntityDisplay.module.scss';

type Props = Omit<Extract<IEntity, { type: EntityType.Ant }>, 'type'> & {
    className?: string;
};

export const AntEntity: React.FC<Props> = props => {
    const className = classNames(styles.ant, props.className, props.color ? styles[`ant--${props.color}`] : undefined);

    return <span className={className}>✱</span>;
}