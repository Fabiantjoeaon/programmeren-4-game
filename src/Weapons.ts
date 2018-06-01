import { Body, Bodies, Vector, World, Composite } from "matter-js";
import Scene from "./Scene";
import Player from "./Player";
import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

export default interface WeaponStrategy {
    player: Player;
    fire(mousePosition: Vector): void;
}

export class Blaster implements WeaponStrategy {
    public player: Player;
    private projectileSize: number = 20;

    constructor(player: Player) {
        this.player = player;
    }

    public fire(mousePosition: Vector): void {
        this.player.addProjectile(this.projectileSize, mousePosition);
    }
}

// export class OtherWeapon implements WeaponStrategy {
//     constructor() {}

//     public fire(): void {}
// }
