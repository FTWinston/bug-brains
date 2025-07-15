export function assertNever(x: never, description: string): never {
    throw new Error(`Unhandled ${description} type: ${(x as { type: string }).type}`);
}
