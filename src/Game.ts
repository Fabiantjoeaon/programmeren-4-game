import Scene from "./Scene";

class UI {
    private scoreEl: HTMLElement;
    constructor() {
        this.scoreEl = document.querySelector(".score");
    }

    public updateScore(score: number) {
        this.scoreEl.innerText = `${score}`;
    }
}

export default class Game {
    private static instance: Game;
    public scene: Scene = Scene.getInstance();
    public score: number = 0;
    private ui: UI;

    constructor() {
        this.ui = new UI();
    }

    public updateScore(score: number) {
        this.score += score;
        this.ui.updateScore(this.score);
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
