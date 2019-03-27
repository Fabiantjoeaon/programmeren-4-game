import Scene from "./Scene";
import UI from "./UI";

export default class Game {
    private static instance: Game;
    public scene: Scene = Scene.getInstance();
    public score: number = 0;

    public updateScore(score: number) {
        this.score += score;
        UI.updateScore(this.score);
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
