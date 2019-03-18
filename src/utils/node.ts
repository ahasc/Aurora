export class Node<V> {

  public value: V;
  public childs: Map<string, Node<V>>;

  /**
   * @description Constructor for Node
   * @param       value Value to attach to the Node
   * @returns     New Node instance
   */
  constructor(value: V) {
    this.value = value;
    this.childs = new Map<string, Node<V>>();
  }
}
