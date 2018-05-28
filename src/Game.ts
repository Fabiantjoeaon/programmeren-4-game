import Scene from "./Scene";

export default class Game {
    private static instance: Game;
    private scene: Scene;

    private constructor() {
        this.scene = Scene.getInstance();
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
