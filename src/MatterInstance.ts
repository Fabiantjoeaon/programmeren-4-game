import { Engine, Render } from "matter-js";

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
        Engine.run(this.engine);

        this.render = Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                wireframes: false,
                background: "#000"
            }
        });
        this.updateWindowDimensions(window.innerWidth, window.innerHeight);

        Render.run(this.render);

        window.addEventListener("resize", () => {
            this.updateWindowDimensions(window.innerWidth, window.innerHeight);
        });
    }

    private updateWindowDimensions(width: number, height: number) {
        this.render.canvas.width = width;
        this.render.canvas.height = height;
    }

    public static getInstance() {
        if (!MatterInstance.instance) {
            MatterInstance.instance = new MatterInstance();
        }
        return MatterInstance.instance;
    }
}
