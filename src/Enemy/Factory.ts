import { PlainEnemy, AdvancedEnemy, AdvancedEnemyDecorator } from ".";

export default class EnemyFactory {
  create(type: Object);
  create(type: "PlainEnemy"): PlainEnemy;
  create(type: "AdvancedEnemy");

  public create(enemyOptions) {
    switch (enemyOptions.type) {
      case "PlainEnemy":
        return new PlainEnemy(enemyOptions);

      case "AdvancedEnemy":
        return new AdvancedEnemyDecorator(new AdvancedEnemy(enemyOptions));

      default:
        console.warn("Unknown enemy type, returning PlainEnemy");
        return new PlainEnemy(enemyOptions);
    }
  }
}
