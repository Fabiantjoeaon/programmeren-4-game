import { Vector, Body, World } from "matter-js";
import MatterInstance from "./MatterInstance";

export default class GameObject {
    protected body: Body;

    constructor() {}

    create(body: Body) {
        const { engine } = MatterInstance.getInstance();
        this.body = body;

        World.add(engine.world, body);
    }

    protected move(force: Vector) {
        Body.applyForce(
            this.body,
            { x: this.body.position.x, y: this.body.position.y },
            force
        );
    }
}
