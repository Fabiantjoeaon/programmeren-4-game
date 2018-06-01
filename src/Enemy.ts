import GameObject from "./GameObject";
import {
  Body,
  World,
  Bodies,
  Vector,
  Events,
  IEventCollision,
  Engine,
  Composite
} from "matter-js";
import MatterInstance from "./MatterInstance";
import { getWidth, getHeight } from "../util/getDimensions";
import randomInRange from "../util/randomInRange";

export default class Enemy extends GameObject {
  private width: number = 20;
  private height: number = 40;
  private movementSpeed: number = 0;

  private startingPosition: Vector;

  constructor() {
    super();
    const { canvas, engine } = MatterInstance.getInstance();

    this.startingPosition = {
      x: randomInRange(0, canvas.width),
      y: this.height + 40
    };

    this.create(
      Bodies.rectangle(
        this.startingPosition.x,
        this.startingPosition.y,
        this.width,
        this.height,
        {
          render: {
            fillStyle: "#F36062"
          }
        }
      )
    );
  }

  private handleWallCollision(e: IEventCollision<Engine>) {
    const { bodyA: collision, bodyB: player } = e.pairs[0];
    const { canvas, engine } = MatterInstance.getInstance();

    switch (collision.label) {
      case "topWall":
        Composite.remove(engine.world, this.body);
        break;

      case "bottomWall":
        Composite.remove(engine.world, this.body);
        break;

      case "leftWall":
        Composite.remove(engine.world, this.body);
        break;

      case "rightWall":
        Composite.remove(engine.world, this.body);
        break;
    }
  }

  //private moveToPlayer
}
