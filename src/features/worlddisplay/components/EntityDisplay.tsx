import type { IEntity } from 'src/types/IEntity';
import { EntityType } from 'src/types/EntityType';
import { AntEntity } from './AntEntityDisplay';
import { FoodEntity } from './FoodEntityDisplay';
import { RockEntity } from './RockEntityDisplay';
import styles from './EntityDisplay.module.scss';

type Props = IEntity;

export const Entity: React.FC<Props> = props => {
    switch (props.type) {
        case EntityType.Ant:
            return <AntEntity className={styles.entity} {...props} />;
        case EntityType.Food:
            return <FoodEntity className={styles.entity} {...props} />;
        case EntityType.Rock:
            return <RockEntity className={styles.entity} {...props} />;
        default:
            return '?';
    }
}