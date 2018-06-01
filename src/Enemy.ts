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
import GameObject from "./GameObject";
import Game from "./Game";
import { getWidth, getHeight } from "../util/getDimensions";
import randomInRange from "../util/randomInRange";
import interpolate from "../util/interpolate";

export default class Enemy extends GameObject {
    private width: number = 20;
    private height: number = 40;
    private moveTimeOut: number = 1000;
    private worth: number;

    private startingPosition: Vector;

    constructor(moveTimeOut: number, worth: number) {
        super();
        this.moveTimeOut = moveTimeOut;
        this.worth = worth;

        const { canvas, engine } = MatterInstance.getInstance();

        this.startingPosition = {
            x: randomInRange(0, canvas.width),
            y: this.height + 40
        };

        this.create(
            Bodies.rectangle(
                this.startingPosition.x,
                this.startingPosition.y,
                this.width,
                this.height,
                {
                    label: "enemy",
                    render: {
                        fillStyle: "#F36062"
                    }
                }
            )
        );

        this.moveTowardsPlayer();
    }

    private moveTowardsPlayer() {
        const division = 100000;
        setInterval(() => {
            const next = Vector.sub(
                Game.getInstance().scene.player.body.position,
                this.body.position
            );
            this.move({ x: next.x / division, y: next.y / division });
        }, this.moveTimeOut);
    }
}
