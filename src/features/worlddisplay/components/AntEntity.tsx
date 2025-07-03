import type { EntityInfo } from 'src/types/EntityInfo';
import { EntityType } from 'src/types/EntityType';
import styles from './AntEntity.module.scss';
import { classNames } from 'src/utils/classNames';

type Props = Omit<Extract<EntityInfo, { type: EntityType.Ant }>, 'type'> & {
    className?: string;
};

export const AntEntity: React.FC<Props> = props => {
    const className = classNames(styles.ant, props.className, props.color ? styles[`ant--${props.color}`] : undefined);

    return <span className={className}>✱</span>;
}