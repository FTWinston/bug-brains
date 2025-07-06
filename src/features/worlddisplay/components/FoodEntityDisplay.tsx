import type { IEntityState } from 'src/types/IEntityState';
import { EntityType } from 'src/types/EntityType';
import { classNames } from 'src/utils/classNames';
import styles from './FoodEntityDisplay.module.scss';

type Props = Omit<Extract<IEntityState, { type: EntityType.Food }>, 'type'> & {
    className?: string;
};

const characters = ['', '➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉'];
export const FoodEntity: React.FC<Props> = props => {
    const className = classNames(styles.food, props.className, styles[`food--${props.quantity}`]);

    const character = characters[props.quantity] || '';
    
    return <span className={className}>{character}</span>;
}