/** Something is associated with a behaviour tree and performs actions. */
export interface IActor extends Object {
    act(): void;
}