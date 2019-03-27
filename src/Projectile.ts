import GameObject from "./GameObject";
import MatterInstance from "./MatterInstance";
import {
  Bodies,
  Vector,
  Events,
  Body,
  Engine,
  IEventCollision,
  Composite
} from "matter-js";
import Game from "./Game";

export default class Projectile extends GameObject {
  private size: number;

  constructor(x: number, y: number, size: number) {
    super();
    this.size = size;
    this.create(
      Bodies.rectangle(x, y, 3, this.size, {
        label: "projectile",
        render: {
          fillStyle: "#fff"
        }
      })
    );

    const { engine } = MatterInstance.getInstance();

    Events.on(engine, "collisionStart", e => {
      this.handleCollision(e);
    });
  }

  protected handleCollision(e: IEventCollision<Engine>) {
    const { bodyA: collision, bodyB: projectile } = e.pairs[0];
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

      case "enemy":
        // TODO: observer pattern ??
        if (projectile.label === "projectile") {
          Composite.remove(engine.world, collision);
          Game.getInstance().updateScore(1000);
        }

        break;
    }
  }
}
