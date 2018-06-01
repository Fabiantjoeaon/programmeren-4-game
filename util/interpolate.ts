import { Vector } from "matter-js";

export default function interpolate(
    a: Vector,
    b: Vector,
    t: number // points A and B, frac between 0 and 1
) {
    var nx = a.x + (b.x - a.x) * t;
    var ny = a.y + (b.y - a.y) * t;
    return { x: nx, y: ny };
}
