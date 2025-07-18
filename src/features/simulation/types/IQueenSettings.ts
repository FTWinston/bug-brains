import type { IActorSettings } from './IActorSettings';

/** Settings and initial values to configure things relating to queens */
export interface IQueenSettings extends IActorSettings {
    spawnRate: number; // Spawn an ant every this many ticks.
}