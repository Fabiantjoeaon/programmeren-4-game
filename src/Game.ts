import Scene from "./Scene";
import Player from "./Player";

export default class Game {
    private static instance: Game;
    private scene: Scene;
    private player: Player;

    private constructor() {
        this.scene = new Scene();
        this.player = new Player();
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
