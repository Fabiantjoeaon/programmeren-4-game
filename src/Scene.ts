import { Bodies, World } from "matter-js";
import MatterInstance from "./MatterInstance";

export default class Scene {
    private matterInstance: MatterInstance;
    constructor() {
        const { canvas, engine } = MatterInstance.getInstance();

        World.add(
            engine.world,
            Bodies.rectangle(0, 0, 1, canvas.height * 2, {
                label: "leftWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            })
        );

        World.add(
            engine.world,
            Bodies.rectangle(canvas.width, 0, 1, canvas.height * 2, {
                label: "rightWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            })
        );

        World.add(
            engine.world,
            Bodies.rectangle(0, 0, canvas.width * 2, 1, {
                label: "topWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            })
        );

        // Bottom
        World.add(
            engine.world,
            Bodies.rectangle(0, canvas.height, canvas.width * 2, 1, {
                label: "bottomWall",
                isStatic: true,
                isSensor: true,
                render: {
                    visible: false,
                    fillStyle: "#fff"
                }
            })
        );
    }
}
