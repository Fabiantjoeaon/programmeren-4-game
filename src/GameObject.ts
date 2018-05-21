export default class GameObject {
    protected el: HTMLElement;

    constructor() {
        this.el = document.createElement("div");
    }
}
