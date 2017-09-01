//Treat single objects or collection of objects in the same way a single instance of an object may be.
//Used to create nested structures of nodes
//A node may be a leaf or a container
//Traversal of the tree is usually implicit

class Node {
  constructor(name) {
    this.children = [];
    this.name = name;
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  removeChild(childToRemove) {
    this.children = this.children.filter(child => {
      return child !== childToRemove;
    });
  }

  getChild(i) {
    return this.children[i];
  }

  hasChildren() {
    return this.children.length > 0;
  }

  traverseUp() {
    if (!this.parent) {
      console.log(`${this.name} is the root node`);
      return;
    }

    console.log(`${this.name} is the child of ${this.parent.name}`);
    this.parent.traverseUp();
  }

  traverseDown() {
    if (!this.hasChildren()) {
      console.log(`${this.name} is a leaf node`);
      return;
    }

    this.children.forEach(child => {
      console.log(`${this.name} is the parent of ${child.name}`);
      child.traverseDown();
    });
  }
}

const root = new Node('Rickard');
const child1 = new Node('Brandon');
const child2 = new Node('Lyanna');
const child3 = new Node('Eddard');
const child4 = new Node('Robb');
const child5 = new Node('Sansa');
const child6 = new Node('Arya');
const child7 = new Node('Bran');

root.addChild(child1);
root.addChild(child2);
root.addChild(child3);

child3.addChild(child4);
child3.addChild(child5);
child3.addChild(child6);
child3.addChild(child7);

root.traverseDown();
child7.traverseUp();
