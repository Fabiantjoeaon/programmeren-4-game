import { times } from "lodash";

//@ts-ignore
import { noise } from "../util/noise";
//@ts-ignore
import "../util/range";

import Cell from "./Cell";
import GameObject from "./GameObject";

export default class Grid extends GameObject {
    private columnAmount: number;
    private rowAmount: number;
    private noiseInstance: any;
    private cells: Cell[] = [];

    constructor(columnAmount: number, rowAmount: number) {
        super();

        this.columnAmount = columnAmount;
        this.rowAmount = rowAmount;
        this.noiseInstance = noise;

        this.generateNoise(Math.random());
        this.form();
    }

    private generateNoise(seed: number) {
        this.noiseInstance.seed(seed);
    }

    private form() {
        //@ts-ignore
        for (const x of [...this.columnAmount]) {
            //@ts-ignore
            for (const y of [...this.rowAmount]) {
                const value = this.noiseInstance.simplex2(x / 100, y / 100);
                this.cells.push(new Cell(value * 100, x, y));
            }
        }

        console.log(this.cells);
    }

    // TODO: input through drag handlers etc.
}
