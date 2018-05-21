import Grid from "./Grid";

export default class Game {
    private static instance: Game;
    private grid: Grid;

    private constructor() {
        this.grid = new Grid(4, 4);
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}
