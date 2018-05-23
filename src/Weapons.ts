import { Body, Bodies, Vector, World } from "matter-js";
import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

export abstract class WeaponStrategy implements GameObject {
    private playerPosition: Vector;
    public body: Body;
    protected type: String;

    constructor(playerPosition: Vector) {
        const { engine } = MatterInstance.getInstance();
        this.playerPosition = playerPosition;
        this.body = Bodies.rectangle(
            this.playerPosition.x + 20,
            this.playerPosition.y,
            1,
            100
        );
        World.add(engine.world, this.body);
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
