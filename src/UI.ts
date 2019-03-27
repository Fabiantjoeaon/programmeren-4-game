export default class UI {
    public static updateScore(score: number) {
        document.querySelector(".score").innerHTML = `<span>${score}</span>`;
    }

    public static switchWeapon(weapon: string) {
        const weapons = document.querySelectorAll(".weapon");
        for (const weapon of [].slice.call(weapons)) {
            weapon.classList.remove("active");
        }
        document.querySelector(`.${weapon}`).classList.add("active");
    }
}
