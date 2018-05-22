// import Matter from "matter-js";
import MatterInstance from "./MatterInstance";

export default class Scene {
    private matterInstance: MatterInstance;
    constructor() {
        this.matterInstance = MatterInstance.getInstance();
    }
}
