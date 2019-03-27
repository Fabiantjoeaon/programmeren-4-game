import { PlainEnemy, AdvancedEnemy } from ".";

export default class EnemyFactory {
  create(type: Object);
  create(type: "PlainEnemy"): PlainEnemy;
  create(type: "AdvancedEnemy"): AdvancedEnemy;

  public create(enemyOptions): PlainEnemy | AdvancedEnemy {
    switch (enemyOptions.type) {
      case "PlainEnemy":
        return new PlainEnemy(enemyOptions);

      case "AdvancedEnemy":
        return new AdvancedEnemy(enemyOptions);

      default:
        console.warn("Unknown enemy type, returning PlainEnemy");
        return new PlainEnemy(enemyOptions);
    }
  }
}
