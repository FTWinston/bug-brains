import type { IEntity } from 'src/types/IEntity';
import { EntityType } from 'src/types/EntityType';
import { classNames } from 'src/utils/classNames';
import styles from './RockEntityDisplay.module.scss';

type Props = Omit<Extract<IEntity, { type: EntityType.Rock }>, 'type'> & {
    className?: string;
};

export const RockEntity: React.FC<Props> = props => {
    const className = classNames(styles.rock, props.className); 

    return <span className={className}>☉</span>;
}