import {
    Body,
    World,
    Bodies,
    Vector,
    Events,
    IEventCollision,
    Engine,
    Composite
} from "matter-js";
import MatterInstance from "./MatterInstance";
import Game from "./Game";
import GameObject from "./GameObject";
import WeaponStrategy, { Blaster } from "./Weapons";
import Projectile from "./Projectile";
import degreesToRadians from "../util/degreesToRadians";
import { getWidth, getHeight } from "../util/getDimensions";

enum Direction {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
}

enum Action {
    Fire = 38,
    AimLeft = 37,
    AimRight = 39
}

export default class Player extends GameObject {
    private startingPosition: Vector = {
        x: getWidth() / 2,
        y: getHeight() / 2 + 150
    };
    public aimVector: Vector = {
        x: 0,
        y: 0
    };
    private aimAngle: number = 0;
    private size: number = 30;

    private activeWeapon: WeaponStrategy;
    private blaster: Blaster;

    constructor() {
        super();
        const { engine } = MatterInstance.getInstance();
        this.create(
            Bodies.rectangle(
                this.startingPosition.x,
                this.startingPosition.y,
                this.size,
                this.size,
                {
                    render: {
                        fillStyle: "#fff"
                    }
                }
            )
        );

        document.addEventListener("keydown", e => {
            this.handleControls(e.keyCode);
        });
        Events.on(engine, "collisionStart", e => {
            this.handleWallCollision(e);
        });

        this.blaster = new Blaster();
        this.activeWeapon = this.blaster;
    }

    private handleControls(keyCode: number): void {
        switch (keyCode) {
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

            case Action.AimLeft:
                this.rotateAim(-1);
                break;

            case Action.AimRight:
                this.rotateAim(1);
                break;

            case Action.Fire:
                this.activeWeapon.fire();
                break;
        }
    }

    private rotateAim(angle: number) {
        this.aimAngle = this.aimAngle + angle;
        this.aimVector = Vector.rotateAbout(
            this.aimVector,
            degreesToRadians(this.aimAngle),
            this.body.position
        );
        console.log(this.aimAngle, this.aimVector);
    }

    private handleWallCollision(e: IEventCollision<Engine>) {
        const { bodyA: player, bodyB: collision } = e.pairs[0];
        const { canvas } = MatterInstance.getInstance();

        switch (collision.label) {
            case "topWall":
                console.log("TOP");
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
