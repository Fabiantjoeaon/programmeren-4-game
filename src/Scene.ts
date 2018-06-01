import { Bodies, World, Body, Vector } from "matter-js";
import Player from "./Player";
import MatterInstance from "./MatterInstance";
import degreesToRadians from "../util/degreesToRadians";
import Enemy from "./Enemy";

export default class Scene {
    private static instance: Scene;
    public walls: any = {};
    public player: Player;
    private enemies: Enemy[] = [];
    private enemySpawnTimeout: number = 1000;
    private enemyCounter: number = 0;

    constructor() {
        this.player = new Player();
        this.createEnemies();
        this.createWalls();
    }

    private createEnemies() {
        setInterval(() => {
            this.enemies.push(new Enemy(1000, 1000));
            this.enemyCounter++;
        }, this.enemySpawnTimeout);
    }

    static getInstance() {
        if (!Scene.instance) {
            Scene.instance = new Scene();
        }
        return Scene.instance;
    }

    private createWalls(): void {
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
