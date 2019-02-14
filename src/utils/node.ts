export class Node<V> {

  public value: V;
  public childs: Map<string, Node<V>>;

  constructor(value: V) {
    this.value = value;
    this.childs = new Map<string, Node<V>>();
  }
}
