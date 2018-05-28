import { Body, Bodies, Vector, World, Composite } from "matter-js";
import Scene from "./Scene";
import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

export default interface WeaponStrategy {
    fire(): void;
}

export class Blaster implements WeaponStrategy {
    private projectileSize: number = 50;
    constructor() {}

    public fire(): void {
        Scene.getInstance().addProjectile(this.projectileSize);
    }
}

// export class OtherWeapon implements WeaponStrategy {
//     constructor() {}

//     public fire(): void {}
// }
