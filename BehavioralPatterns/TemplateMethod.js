// Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
// Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm’s structure.”

// An easy way to think of Template Method is that of an algorithm with holes. It is up to the developer to fill these holes with appropriate functionality for each step.

// AbstractClass -- In sample code: datastore
//  - offers an interface for clients to invoke the templateMethod
//  - implements template method which defines the primitive Steps for an algorithm
//  - provides the hooks (through method overriding) for a client developer to implement the Steps
// ConcreteClass -- In sample code: mySql
//  - implements the primitive Steps as defined in AbstractClass

const datastore = {
  process() {
    this.connect();
    this.select();
    this.disconnect();
  }
};

const mySQL = Object.create(datastore);

mySQL.connect = function() {
  console.log("connect step");
};

mySQL.select = function() {
  console.log("select step");
};

mySQL.disconnect = function() {
  console.log("disconnect step");
};

mySQL.process();