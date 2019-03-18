import { Node } from "./node";
import { Router } from "..";

export class Tree<V> {

  private static  trees: Map<string, Tree<any>> = new Map();
  private         root: Node<V>;

  /**
   * @description Constructor for Tree
   * @returns     New Tree instance
   */
  constructor() {
    this.root = null;
  }

  /**
   * @description Create a new Tree of given class and stores it. To get instanciated trees, use static "getTree" function
   * @param       contentIdentifier Identifier of the Tree to create
   */
  public static createTree<T>(contentIdentifier: string): Tree<T> {
    Tree.trees.set(contentIdentifier, new Tree<T>());
    return Tree.trees.get(contentIdentifier);
  }

  /**
   * @description Create a new Tree of given class and stores it. To get instanciated trees, use static "getTree" function
   * @param       contentIdentifier Identifier of the Tree to get
   * @returns     Instance of tree
   */
  public static getTree(contentIdentifier: string): Tree<any> {
    return Tree.trees.get(contentIdentifier) || null;
  }

  /**
   * @description   Remove given tree from registered trees
   * @param         treeIdentifier Identifier of the Tree to remove
   */
  public static remove(treeIdentifier: string): void {
    Tree.trees.delete(treeIdentifier); 
  }

  /**
   * @description Remove all trees from registered trees
   */
  public static clear(): void {
    Tree.trees.clear(); 
  }

  /**
   * @description Get an instance of Node by its full path in Tree
   * @param       url Path of the searched instance 
   * @returns     Instance of found node, null either
   */
  public getNodeByUrl(url: string): { node: Node<V>, remainingPath: string } {
    let cursor = this.root;
    const identifiers: string[] = url.slice(1).split("/");

    if (cursor === null) {
      return null; 
    } else if (identifiers.length === 1 && identifiers[0] === "") {
      return { 
        node: this.root, 
        remainingPath: identifiers[0] 
      };
    } else {
      let resolvedNode: string = null;
      if (identifiers[identifiers.length - 1] === "") {
        identifiers.pop();
      }
      for (const identifier of identifiers) {
        if (cursor.childs.has(identifier)) {
          cursor = cursor.childs.get(identifier);
          resolvedNode = identifier
        } else {
          if (cursor.value instanceof Router && (cursor.value as Router).hasRoute(identifier)) {
            return { 
              node: cursor, 
              remainingPath: identifiers.slice(identifiers.indexOf(resolvedNode) + 1).join("/")
          };
          } else {
            return null;
          }
        }
      }
    }
  }

  /**
   * @description Insert a new node in the tree, with a given instance attached on it            
   * @param       identifier Identifier of the node in the tree, corresponding to part of full path to access it
   * @param       value Value to attach to the node in the tree
   * @param       parentInstance Instance attached to parent node. If not provided, attached to root node
   * @returns     Value of inserted node
   */
  public insert(identifier: string, value: V, parentInstance?: any): V {
    if (parentInstance === undefined) {
      this.root = new Node<V>(value);
    } else {
      const parent = this.getNodeByValue(this.root, parentInstance);
      if (parent != null) {
        parent.childs.set(identifier, new Node<V>(value));
        return value;
      } else {
        return null;
      }
    }
  }

  /**
   * @description Get an instance of Node by it's value
   * @param root 
   * @param searchValue 
   * @returns
   */
  private getNodeByValue(root: Node<V>, searchValue: any): Node<V> {
    while (root != null) {
      if (root.value === searchValue) {
        return this.root;
      } else if (root.childs.size > 0) {
        for (const child of root.childs.values()) {
          if (child.value === searchValue) {
            return child;
          } else {
            return this.getNodeByValue(child, searchValue);
          }
        }
        return null;
      } else {
        return null;
      }
    }
  }
}
