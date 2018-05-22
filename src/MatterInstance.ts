import { Engine, Render } from "matter-js";
import { getWidth, getHeight } from "../util/getDimensions";

export default class MatterInstance {
    private static instance: MatterInstance;

    public canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    public engine: Engine;
    public render: Render;

    private constructor() {
        this.canvas = document.getElementById("root") as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext(
            "2d"
        ) as CanvasRenderingContext2D;
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.render = Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                wireframes: false
                //@ts-ignore
                // background: "#000"
            }
        });
        this.updateWindowDimensions(getWidth(), getHeight());

        Engine.run(this.engine);
        Render.run(this.render);

        window.addEventListener("resize", () => {
            this.updateWindowDimensions(getWidth(), getHeight());
        });
    }

    private updateWindowDimensions(width: number, height: number): void {
        this.render.canvas.width = width;
        this.render.canvas.height = height;
        // @ts-ignore
        // this.engine.world.bounds.min.x = 0;
        // // @ts-ignore
        // this.engine.world.bounds.max.x = width;
        // // @ts-ignore
        // this.engine.world.bounds.min.y = 0;
        // // @ts-ignore
        // this.engine.world.bounds.max.y = height;
        console.log(this.engine);
    }

    public static getInstance(): MatterInstance {
        if (!MatterInstance.instance) {
            MatterInstance.instance = new MatterInstance();
        }
        return MatterInstance.instance;
    }
}
