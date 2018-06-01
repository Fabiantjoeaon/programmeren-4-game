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

export default class Player extends GameObject {
    private startingPosition: Vector = {
        x: getWidth() / 2,
        y: getHeight() / 2 + 150
    };
    private size: number = 30;
    private acceleration = 0.0035;

    private activeWeapon: WeaponStrategy;
    private blaster: Blaster;
    public projectiles: Projectile[] = [];

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
        document.addEventListener("mousedown", e => {
            const { x, y } = e;
            this.activeWeapon.fire({ x, y });
        });
        Events.on(engine, "collisionStart", e => {
            this.handleWallCollision(e);
        });

        this.activeWeapon = new Blaster(this);
    }

    private handleControls(keyCode: number): void {
        switch (keyCode) {
            case Direction.Up:
                this.move({
                    x: 0,
                    y: -this.acceleration
                });

                break;
            case Direction.Down:
                this.move({
                    x: 0,
                    y: this.acceleration
                });
                break;
            case Direction.Left:
                this.move({
                    x: -this.acceleration,
                    y: 0
                });
                break;
            case Direction.Right:
                this.move({
                    x: this.acceleration,
                    y: 0
                });
                break;
        }
    }

    private handleWallCollision(e: IEventCollision<Engine>) {
        const { bodyA: player, bodyB: collision } = e.pairs[0];
        const { canvas } = MatterInstance.getInstance();
        const offset = 40;

        switch (collision.label) {
            case "topWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: canvas.height - this.size - offset
                });
                break;

            case "bottomWall":
                Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: this.size + offset
                });
                break;

            case "leftWall":
                Body.setPosition(this.body, {
                    x: canvas.width - (this.size - offset),
                    y: this.body.position.y
                });
                break;

            case "rightWall":
                Body.setPosition(this.body, {
                    x: this.size + offset,
                    y: this.body.position.y
                });
                break;
        }
    }

    public addProjectile(size: number, mousePosition: Vector) {
        const projectile = new Projectile(
            this.body.position.x,
            this.body.position.y,
            size
        );

        const dir = Vector.angle(projectile.body.position, mousePosition);

        projectile.move({
            x: Math.cos(dir) / 100,
            y: Math.sin(dir) / 100
        });
        this.projectiles.push(projectile);
    }
}
