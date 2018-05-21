import GameObject from "./GameObject";

export default class Cell extends GameObject {
    private value: number;
    private x: number;
    private y: number;

    static colorMap = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    };

    constructor(value: number, x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
        this.value = value;
    }
}
