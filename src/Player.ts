import {
    Body,
    World,
    Bodies,
    Vector,
    Events,
    IEventCollision,
    Engine
} from "matter-js";
import MatterInstance from "./MatterInstance";
import { getWidth, getHeight } from "../util/getDimensions";

enum Direction {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
}

export default class Player {
    private body: Body;
    private position: Vector = {
        x: getWidth() / 2,
        y: getHeight() / 2 + 150
    };
    private aimAngle: number = 0;

    constructor() {
        const { engine } = MatterInstance.getInstance();
        this.position = this.position;
        this.body = Bodies.rectangle(this.position.x, this.position.y, 30, 30, {
            render: {
                fillStyle: "#fff"
            }
        });

        World.add(engine.world, this.body);

        this.handleControls();
        Events.on(engine, "collisionStart", e => {
            this.handleWallCollision(e);
        });
    }

    private handleControls() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case Direction.Up:
                    this.move({
                        x: 0,
                        y: -0.004
                    });
                    break;
                case Direction.Down:
                    this.move({
                        x: 0,
                        y: 0.004
                    });
                    break;
                case Direction.Left:
                    this.move({
                        x: -0.004,
                        y: 0
                    });
                    break;
                case Direction.Right:
                    this.move({
                        x: 0.004,
                        y: 0
                    });
                    break;
            }
        });
    }

    private handleWallCollision(e: IEventCollision<Engine>) {
        const { bodyA } = e.pairs[0];
        const { canvas } = MatterInstance.getInstance();
        switch (bodyA.label) {
            case "topWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: canvas.height
                });
                this.move({
                    x: this.body.force.x,
                    y: (this.body.force.y *= -1)
                });
                break;
            case "bottomWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: 0
                });
                this.move({
                    x: this.body.force.x,
                    y: (this.body.force.y *= -1)
                });
                break;
            case "leftWall":
                Body.setPosition(this.body, {
                    x: canvas.width,
                    y: this.body.position.y
                });
                this.move({
                    x: (this.body.force.x *= -1),
                    y: this.body.force.y
                });
                break;
            case "rightWall":
                Body.setPosition(this.body, {
                    x: 0,
                    y: this.body.position.y
                });
                this.move({
                    x: (this.body.force.x *= -1),
                    y: this.body.force.y
                });
                break;
        }
        //MatterInstance.getInstance().canvas.height
    }

    private move(force: Vector) {
        Body.applyForce(
            this.body,
            { x: this.position.x, y: this.position.y },
            force
        );
    }
}
