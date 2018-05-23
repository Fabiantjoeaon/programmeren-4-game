import { Vector, Body } from "matter-js";

export default interface GameObject {
    body: Body;

    move(force: Vector): void;
}
