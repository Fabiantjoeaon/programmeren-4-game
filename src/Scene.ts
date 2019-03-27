import { Bodies, World, Body, Vector } from "matter-js";
import Player from "./Player";
import MatterInstance from "./MatterInstance";
import degreesToRadians from "../util/degreesToRadians";
import EnemyFactory from "./Enemy/Factory";
import EnemyCollection from "./Enemy/Collection";
import { AdvancedEnemy } from "./Enemy/index";

export default class Scene {
  private static instance: Scene;
  public walls: any = {};
  public player: Player;
  private enemyFactory: EnemyFactory;
  private enemyCollection: EnemyCollection;

  private enemySpawnTimeout: number = 1000;
  private enemyFireTimeout: number = 2000;

  constructor() {
    this.player = new Player();
    this.createWalls();

    this.createEnemies();
    this.handleEnemyInteraction();
  }

  static getInstance() {
    if (!Scene.instance) {
      Scene.instance = new Scene();
    }
    return Scene.instance;
  }

  /**
   *
   */
  private createEnemies() {
    this.enemyFactory = new EnemyFactory();
    this.enemyCollection = new EnemyCollection();
    setInterval(() => {
      this.enemyCollection.add(
        this.enemyFactory.create({ type: "PlainEnemy" })
      );
      this.enemyCollection.add(
        this.enemyFactory.create({ type: "AdvancedEnemy" })
      );
      //   this.enemyCounter++;
    }, this.enemySpawnTimeout);
  }

  /**
   *
   */
  private handleEnemyInteraction() {
    setTimeout(() => {
      setInterval(() => {
        const iterator = this.enemyCollection.getIterator();
        while (iterator.isValid()) {
          const enemy = iterator.next();
          if (enemy instanceof AdvancedEnemy) {
            enemy.blaster.fire({
              x: this.player.body.position.x,
              y: this.player.body.position.y
            });
          }
        }
      }, this.enemyFireTimeout);
    }, 1000);
  }

  /**
   *
   */
  private createWalls(): void {
    const { canvas, engine } = MatterInstance.getInstance();
    this.walls.left = Bodies.rectangle(0, 0, 1, canvas.height * 2, {
      label: "leftWall",
      isStatic: true,
      isSensor: true,
      render: {
        visible: false,
        fillStyle: "#fff"
      }
    });
    World.add(engine.world, this.walls.left);

    this.walls.right = Bodies.rectangle(canvas.width, 0, 1, canvas.height * 2, {
      label: "rightWall",
      isStatic: true,
      isSensor: true,
      render: {
        visible: false,
        fillStyle: "#fff"
      }
    });
    World.add(engine.world, this.walls.right);

    this.walls.top = Bodies.rectangle(0, 0, canvas.width * 2, 1, {
      label: "topWall",
      isStatic: true,
      isSensor: true,
      render: {
        visible: false,
        fillStyle: "#fff"
      }
    });
    World.add(engine.world, this.walls.top);

    this.walls.bottom = Bodies.rectangle(
      0,
      canvas.height,
      canvas.width * 2,
      1,
      {
        label: "bottomWall",
        isStatic: true,
        isSensor: true,
        render: {
          visible: false,
          fillStyle: "#fff"
        }
      }
    );

    World.add(engine.world, this.walls.bottom);
  }
}
