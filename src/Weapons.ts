import { Body, Bodies, Vector, World, Composite } from "matter-js";
import Scene from "./Scene";
import Player from "./Player";
import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

export default interface WeaponStrategy {
    player: Player;
    fire(): void;
}

export class Blaster implements WeaponStrategy {
    public player: Player;
    private projectileSize: number = 20;

    constructor(player: Player) {
        this.player = player;
    }

    public fire(): void {
        this.player.addProjectile(this.projectileSize);
    }
}

// export class OtherWeapon implements WeaponStrategy {
//     constructor() {}

//     public fire(): void {}
// }
