import { Body, Bodies, Vector, World, Composite } from "matter-js";
import Scene from "./Scene";

import MatterInstance from "./MatterInstance";
import GameObject from "./GameObject";

import Player from "./Player";
import { AdvancedEnemyDecorator } from "./Enemy/index";

type Holder = Player | AdvancedEnemyDecorator;
export default interface WeaponStrategy {
  holder: Holder;
  fire(mousePosition: Vector): void;
}

export class Blaster implements WeaponStrategy {
  public holder: Holder;
  private projectileSize: number = 20;

  constructor(holder: Holder) {
    this.holder = holder;
  }

  public fire(mousePosition: Vector): void {
    this.holder.addProjectile(this.projectileSize, mousePosition);
  }
}

export class TripleBlaster implements WeaponStrategy {
  public holder: Holder;
  private projectileSize: number = 40;

  constructor(holder: Holder) {
    this.holder = holder;
  }

  public fire(mousePosition: Vector): void {
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
  }
}

export class Nuker implements WeaponStrategy {
  public holder: Holder;
  private projectileSize: number = 100;

  constructor(holder: Holder) {
    this.holder = holder;
  }

  public fire(mousePosition: Vector): void {
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
    this.holder.addProjectile(this.projectileSize, mousePosition);
  }
}
