import type { EntityInfo } from 'src/types/EntityInfo';
import { EntityType } from 'src/types/EntityType';
import styles from './FoodEntity.module.scss';
import { classNames } from 'src/utils/classNames';

type Props = Omit<Extract<EntityInfo, { type: EntityType.Food }>, 'type'> & {
    className?: string;
};

const characters = ['', '➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉'];
export const FoodEntity: React.FC<Props> = props => {
    const className = classNames(styles.food, props.className, styles[`food--${props.quantity}`]);

    const character = characters[props.quantity] || '';
    
    return <span className={className}>{character}</span>;
}