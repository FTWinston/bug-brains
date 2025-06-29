import type { IEntity } from '../types/IEntity';
import type { WorldLocation } from './WorldLocation';

export class Entity implements IEntity {
    constructor(location: WorldLocation) {
        this.location = location;
    }

    public location: WorldLocation;

    public get position() {
        return this.location.position;
    }

    public moveTo(location: WorldLocation) {
        if (this.location === location) {
            return; // Already at the desired location.
        }

        // Remove from current location.
        const index = this.location.contents.indexOf(this);
        if (index !== -1) {
            this.location.contents.splice(index, 1);
        }

        // Add to new location.
        this.location = location;
        this.location.contents.push(this);
    }
}