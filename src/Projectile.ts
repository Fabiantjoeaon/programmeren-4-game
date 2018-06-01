import GameObject from "./GameObject";
import MatterInstance from "./MatterInstance";
import {
    Bodies,
    Vector,
    Events,
    Body,
    Engine,
    IEventCollision,
    Composite
} from "matter-js";
import { getWidth, getHeight } from "../util/getDimensions";

export default class Projectile extends GameObject {
    private size: number;

    constructor(x: number, y: number, size: number) {
        super();
        this.size = size;
        this.create(
            Bodies.rectangle(x, y, 3, this.size, {
                render: {
                    fillStyle: "#fff"
                }
            })
        );

        const { engine } = MatterInstance.getInstance();

        Events.on(engine, "collisionStart", e => {
            this.handleWallCollision(e);
        });
    }

    private handleWallCollision(e: IEventCollision<Engine>) {
        const { bodyA: collision, bodyB: player } = e.pairs[0];
        const { canvas, engine } = MatterInstance.getInstance();

        switch (collision.label) {
            case "topWall":
                Composite.remove(engine.world, this.body);
                break;

            case "bottomWall":
                Composite.remove(engine.world, this.body);
                break;

            case "leftWall":
                Composite.remove(engine.world, this.body);
                break;

            case "rightWall":
                Composite.remove(engine.world, this.body);
                break;
        }
    }
}
