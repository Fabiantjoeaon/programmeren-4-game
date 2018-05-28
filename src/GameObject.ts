import { Vector, Body, World } from "matter-js";
import MatterInstance from "./MatterInstance";

export default class GameObject {
    public body: Body;

    constructor() {}

    create(body: Body) {
        const { engine } = MatterInstance.getInstance();
        this.body = body;

        World.add(engine.world, body);
    }

    public move(force: Vector) {
        Body.applyForce(this.body, this.body.position, force);
    }
}
