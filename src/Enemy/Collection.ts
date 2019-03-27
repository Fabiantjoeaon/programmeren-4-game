class EnemyIterator {
  private collection: EnemyCollection;

  /**
   * Stores the current traversal position. An iterator may have a lot of
   * other fields for storing iteration state, especially when it is supposed
   * to work with a particular kind of collection.
   */
  private position: number = 0;

  /**
   * This variable indicates the traversal direction.
   */
  private reverse: boolean = false;

  constructor(collection: EnemyCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public getCurrentItem(): any {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): any {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public isValid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

export default class EnemyCollection {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public add(item): void {
    this.items.push(item);
  }

  public getIterator(): EnemyIterator {
    return new EnemyIterator(this);
  }

  public getReverseIterator(): EnemyIterator {
    return new EnemyIterator(this, true);
  }
}
