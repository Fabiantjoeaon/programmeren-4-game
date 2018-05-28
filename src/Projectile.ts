import GameObject from "./GameObject";
import { Bodies, Vector } from "matter-js";
import { getWidth, getHeight } from "../util/getDimensions";

export default class Projectile extends GameObject {
    private size: number;

    constructor(x: number, y: number, size: number) {
        super();
        this.size = size;
        this.create(
            Bodies.rectangle(x, y, 1, this.size, {
                render: {
                    fillStyle: "#ff0000"
                }
            })
        );
    }
}
