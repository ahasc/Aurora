import { expect } from "chai";

import { Node } from "../../src/utils/node";

describe("Node", () => {

  it("Should export a function", () => {

    // Assert
    expect(Node).to.be.a("function");
  });

  it("Should have value property as string", () => {

    // Arrange
    let node;

    //Arrange
    node =  new Node("test");

    // Assert
    expect(node.value).to.be.a("string").and.equals("test");
  });

  it("Should have value property as number", () => {
    // Arrange
    let node;

    //Arrange
    node =  new Node(42);

    // Assert
    expect(node.value).to.be.a("number").and.equals(42);
  });

  it("Should have childs property as map", () => {
    // Arrange
    let node;

    //Arrange
    node =  new Node(null);

    // Assert
    expect(node.childs).to.be.a("map");
  });
});
