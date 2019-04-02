import { Bodies, Vector } from "matter-js";
import MatterInstance from "../MatterInstance";
import GameObject from "../GameObject";
import Game from "../Game";
import { Blaster } from "../Weapons";
import randomInRange from "../../util/randomInRange";
import Projectile from "../Projectile";

export class AdvancedEnemyDecorator {
  private enemy;

  public blaster: Blaster;

  public projectiles: Projectile[] = [];
  public type = "advanced";

  constructor(enemy) {
    this.enemy = enemy;
    this.blaster = new Blaster(this);
  }

  public addProjectile(size: number, playerPosition: Vector) {
    const projectile = new Projectile(
      this.enemy.body.position.x,
      this.enemy.body.position.y,
      size
    );

    const dir = Vector.angle(projectile.body.position, playerPosition);

    projectile.move({
      x: Math.cos(dir) / 100,
      y: Math.sin(dir) / 100
    });
    this.projectiles.push(projectile);
  }
}

export class PlainEnemy extends GameObject {
  private width: number = 20;
  private height: number = 40;
  private type = "plain";
  private moveTimeOut: number = 1000;
  private worth: number = 400;

  private startingPosition: Vector;

  constructor(enemyOptions) {
    super();

    const { canvas } = MatterInstance.getInstance();

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
          label: "enemy",
          render: {
            fillStyle: "#F36062"
          }
        }
      )
    );

    this.moveTowardsPlayer();
  }

  private moveTowardsPlayer() {
    const division = 100000;
    setInterval(() => {
      const next = Vector.sub(
        Game.getInstance().scene.player.body.position,
        this.body.position
      );
      this.move({ x: next.x / division, y: next.y / division });
    }, this.moveTimeOut);
  }
}

export class AdvancedEnemy extends GameObject {
  private width: number = 60;
  private height: number = 80;
  private moveTimeOut: number = 800;
  private worth: number = 400;

  private startingPosition: Vector;

  constructor(enemyOptions) {
    super();

    const { canvas } = MatterInstance.getInstance();

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
          label: "enemy",
          render: {
            fillStyle: "#aacbff"
          }
        }
      )
    );

    this.moveTowardsPlayer();
  }

  private moveTowardsPlayer() {
    const division = 100000;
    setInterval(() => {
      const next = Vector.sub(
        Game.getInstance().scene.player.body.position,
        this.body.position
      );
      this.move({ x: next.x / division, y: next.y / division });
    }, this.moveTimeOut);
  }
}
