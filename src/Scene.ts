import { Bodies, World, Body } from "matter-js";
import MatterInstance from "./MatterInstance";

export default class Scene {
    public walls: any = {};

    constructor() {
        const { canvas, engine } = MatterInstance.getInstance();

        this.walls.left = Bodies.rectangle(0, 0, 1, canvas.height * 2, {
            label: "leftWall",
            isStatic: true,
            isSensor: true,
            render: {
                visible: false,
                fillStyle: "#fff"
            }
        });
        World.add(engine.world, this.walls.left);

        this.walls.right = Bodies.rectangle(
            canvas.width,
            0,
            1,
            canvas.height * 2,
            {
                label: "rightWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            }
        );
        World.add(engine.world, this.walls.right);

        this.walls.top = Bodies.rectangle(0, 0, canvas.width * 2, 1, {
            label: "topWall",
            isStatic: true,
            isSensor: true,
            render: {
                visible: false,
                fillStyle: "#fff"
            }
        });
        World.add(engine.world, this.walls.top);

        this.walls.bottom = Bodies.rectangle(
            0,
            canvas.height,
            canvas.width * 2,
            1,
            {
                label: "bottomWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            }
        );

        World.add(engine.world, this.walls.bottom);
    }
}
