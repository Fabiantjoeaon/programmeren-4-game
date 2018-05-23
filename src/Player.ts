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
import Game from "./Game";
import GameObject from "./GameObject";
import { Blaster, WeaponStrategy } from "./Weapons";
import { getWidth, getHeight } from "../util/getDimensions";

enum Direction {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
}

export default class Player implements GameObject {
    public body: Body;
    private startingPosition: Vector = {
        x: getWidth() / 2,
        y: getHeight() / 2 + 150
    };
    private aimAngle: number = 0;
    private size: number = 30;

    private activeWeapon: WeaponStrategy;
    private blaster: Blaster;

    constructor() {
        const { engine } = MatterInstance.getInstance();
        this.body = Bodies.rectangle(
            this.startingPosition.x,
            this.startingPosition.y,
            this.size,
            this.size,
            {
                render: {
                    fillStyle: "#fff"
                }
            }
        );

        World.add(engine.world, this.body);

        this.handleControls();
        Events.on(engine, "collisionStart", e => {
            this.handleWallCollision(e);
        });

        this.blaster = new Blaster(this.body.position);
    }

    public move(force: Vector) {
        Body.applyForce(
            this.body,
            { x: this.body.position.x, y: this.body.position.y },
            force
        );
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
        const { bodyA: collision, bodyB: player } = e.pairs[0];
        const { canvas } = MatterInstance.getInstance();

        switch (collision.label) {
            case "topWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: canvas.height - (this.size - 20)
                });
                break;

            case "bottomWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: this.size + 20
                });
                break;

            case "leftWall":
                Body.setPosition(this.body, {
                    x: canvas.width - this.size,
                    y: this.body.position.y
                });
                break;

            case "rightWall":
                Body.setPosition(this.body, {
                    x: this.size,
                    y: this.body.position.y
                });
                break;
        }
    }
}
