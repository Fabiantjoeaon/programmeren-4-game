import { Bodies, World, Body, Vector } from "matter-js";
import Projectile from "./Projectile";
import Player from "./Player";
import MatterInstance from "./MatterInstance";

export default class Scene {
    private static instance: Scene;
    public walls: any = {};
    public player: Player;
    public projectiles: Projectile[] = [];

    constructor() {
        this.player = new Player();
        this.createWalls();
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

    public addProjectile(size: number) {
        const { body } = this.player;

        const projectile = new Projectile(
            body.position.x,
            body.position.y - 50,
            size
        );

        const delta = Vector.normalise(
            Vector.sub(projectile.body.position, body.position)
        );
        //https://stackoverflow.com/questions/35827012/matter-js-calculating-force-needed
        // const force =

        // const dir = Vector.angle(
        //     projectile.body.position,
        //     this.player.aimVector
        // );

        // projectile.move({
        //     x: Math.cos(dir) * 10,
        //     y: Math.sin(dir) * 10
        // });
        // projectile.move({
        //     x: 0.01,
        //     y: 0.03
        // });
        this.projectiles.push(projectile);
    }
}
