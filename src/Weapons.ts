import { Body, Bodies, Vector, World } from "matter-js";
import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

export abstract class WeaponStrategy extends GameObject {
    private playerPosition: Vector;
    public body: Body;
    protected type: String;

    constructor(playerPosition: Vector) {
        super();
        const { engine } = MatterInstance.getInstance();
        this.playerPosition = playerPosition;
        this.create(
            Bodies.rectangle(
                this.playerPosition.x + 20,
                this.playerPosition.y,
                1,
                100
            )
        );
    }

    public move(force: Vector): void {}
    protected fire(): void {}
}

export class Blaster extends WeaponStrategy {
    protected type = "Blaster";

    constructor(playerPosition: Vector) {
        super(playerPosition);
    }

    protected fire(): void {}
}
