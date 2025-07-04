import type { WorldDisplayAction } from 'src/types/WorldDisplayAction';
import type { World } from './classes/World';
import { createBasicWorld } from './utils/createBasicWorld';

let world: World | undefined;

// Listen for messages from the main thread.
self.addEventListener('message', (event: MessageEvent<WorldDisplayAction>) => {
    // An "init" message should create a World based on a provided identifier, if we haven't already created one.
    // It should then start simulating the world.
    if (event.data.type === 'init') {
        if (world !== undefined) {
            throw new Error('World has already been initialized.');
        }

        if (event.data.id === 'default') {
            world = createBasicWorld();
        }
        else {
            throw new Error(`Unknown world init id: ${event.data.id}`);
        }

        simulateWorld(world);
    }
});

function simulateWorld(world: World) {
    // Send initial world state to the main thread.
    postMessage({ type: 'init', state: world.getDisplayState() });

    // Simulation loop, triggers every 100ms.
    const interval = setInterval(() => {
        // Perform actions for all entities in the world, get the events that occur as a result.
        const events = world.actAllEntities();

        if (events.length > 0) {
            // Send those events in an update message to the main thread.
            postMessage({ type: 'update', events });
        }
    }, 100);

    // Stop interval when this worker is terminated.
    self.addEventListener('close', () => clearInterval(interval));
}
