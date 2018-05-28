import Game from "./Game";
import BezierEasing from "bezier-easing";

console.log(BezierEasing(0.51, 0.01, 0, 1));

window.addEventListener("load", () => {
    Game.getInstance();
});
