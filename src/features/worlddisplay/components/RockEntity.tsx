import type { EntityInfo } from 'src/types/EntityInfo';
import { EntityType } from 'src/types/EntityType';
import styles from './RockEntity.module.scss';
import { classNames } from 'src/utils/classNames';

type Props = Omit<Extract<EntityInfo, { type: EntityType.Rock }>, 'type'> & {
    className?: string;
};

export const RockEntity: React.FC<Props> = props => {
    const className = classNames(styles.rock, props.className); 

    return <span className={className}>☉</span>;
}