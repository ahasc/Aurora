import { expect } from "chai";

import { Tree } from "../../src/utils/tree";
import { Router } from "../../src/modules";

describe("Tree", () => {

  afterEach(() => {
    Tree.clear();
  });

  it("Should export a function", () => {

    // Assert
    expect(Tree).to.be.a("function");
  });

  describe("createTree()", () => {

    it("Should return a Tree instance", () => {

      // Arrange
      let tree = null;

      // Act
      tree = Tree.createTree("test");

      // Assert
      expect(tree).to.be.an.instanceof(Tree);
    });

    it("Should register new tree into private trees property", () => {
      
      // Arrange
      let tree = null;
      let registered = null;
      
      // Act
      tree = Tree.createTree("test");
      registered = Tree.getTree("test");
      
      // Assert
      expect(registered).to.be.equal(tree);
    });
  });

  describe("getTree()", () => {

    it("Should return a Tree instance", () => {

      // Arrange
      let tree = null;

      // Act
      tree = Tree.createTree("test");
      
      // Assert
      expect(tree).to.be.an.instanceof(Tree);
    });

    it("Should return null if no registered tree", () => {

      // Arrange
      let registered = null;

      // Act
      registered = Tree.getTree("unregistered");
      
      // Assert
      expect(registered).to.be.null;
    });
  });

  describe("remove()", () => {

    it("Should remove given tree", () => {

      // Arrange
      let tree = null;
      Tree.createTree("test");

      // Act
      Tree.remove("test");
      tree = Tree.getTree("test");

      //Assert
      expect(tree).to.be.null;
    });
  });

  describe("clear()", () => {

    it("Should clear all trees", () => {

      // Arrange
      let tree = null;
      let tree2 = null;
      Tree.createTree("test");
      Tree.createTree("test2");

      // Act
      Tree.clear();
      tree = Tree.getTree("test");
      tree2 = Tree.getTree("test2");

      // Assert
      expect(tree).to.be.null;
      expect(tree2).to.be.null;
    });
  });

  describe("getNodeByUrl()", () => {

    it("Should return a Node instance if providing complex URL and valid matching", () => {

      // Arrange
      let root = null;
      let node2 = null;
      let found = null;
      let router1 = new Router();
      let router2 = new Router([
        {
          identifier: "route1",
          callback: null
        }
      ]);
      let tree = Tree.createTree("test");

      // Act
      root = tree.insert("", router1);
      node2 = tree.insert("node2", router2, root.value);
      found = tree.getNodeByUrl("/node2/route1").node;

      // Assert
      expect(found.value).to.be.equal(node2.value);
    });

    it("Should return root if providing / URL", () => {

      // Arrange
      let root = null;
      let found = null;
      let tree = Tree.createTree("test");

      // Act
      root = tree.insert("node1", new Router());
      tree.insert("node2", new Router(), root.value);
      found = tree.getNodeByUrl("/").node;

      // Assert
      expect(found.value).to.be.equal(root.value);
    });

    it("Should return null if tree is empty", () => {

      // Arrange
      let found = null;
      let tree = Tree.createTree("test");

      // Act
      found = tree.getNodeByUrl("/node1/node2");

      // Assert
      expect(found).to.be.null;
    });

    it("Should return null if no match", () => {

      // Arrange
      let found = null;
      let tree = Tree.createTree("test");
  
      // Act
      tree.insert("root", new Router());
      found = tree.getNodeByUrl("/unknown");
  
      // Assert
      expect(found).to.be.null;
    });
  });

  describe("insert()", () => {

    it("Should insert as root if tree is empty", () => {

      // Arrange
      let root = null;
      let found = null;
      let tree = Tree.createTree("test");

      // Act
      root = tree.insert("root", new Router());
      found = tree.getNodeByUrl("/").node;

      // Assert
      expect(found.value).to.be.equal(root.value);
    });

    it("Should insert as child of given parent", () => {

      // Arrange
      let root = null;
      let node1 = null;
      let found = null;
      let tree = Tree.createTree("test");

      // Act
      root = tree.insert("root", new Router([{ identifier: "route1", callback: null }]));
      node1 = tree.insert("node1", new Router(), root.value)

      // Assert
      expect(root.childs).to.have.key("node1");
    });

    it("Should return null if parent is not previously inserted", () => {

      // Arrange
      let node1 = null;
      let tree = Tree.createTree("test");

      // Act
      tree.insert("root", new Router([{ identifier: "route1", callback: null }]));
      node1 = tree.insert("node1", new Router(), new Router())

      // Assert
      expect(node1).to.null;
    });
  });
});
