// Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

// A Factory Method creates new objects as instructed by the client. One way to create objects in JavaScript is by invoking a constructor function with the new operator. There are situations however, where the client does not, or should not, know which one of several candidate objects to instantiate. The Factory Method allows the client to delegate object creation while still retaining control over which type to instantiate.

// Participants:

//   Creator -- the 'factory' object that creates new products, implements 'factoryMethod' which returns newly created products
//   AbstractProduct -- not used in JavaScript - declares an interface for products
//   ConcreteProduct -- the product being created
// all products support the same interface (properties and methods)

class Factory {
  constructor() {
    this.employee = null;
  }

  createEmployee(type) {
    if (type === "fulltime") {
      this.employee = new FullTime();
    } else if (type === "parttime") {
      this.employee = new PartTime();
    } else if (type === "temporary") {
      this.employee = new Temporary();
    } else if (type === "contractor") {
      this.employee = new Contractor();
    }

    this.employee.type = type;

    this.employee.say = function () {
      console.log(this.type + ": rate " + this.hourly + "/hour");
    };

    return this.employee;
  }
}

class FullTime {
  constructor() {
    this.hourly = "$25";
  }
}

class PartTime  {
  constructor() {
    this.hourly = "$15";
  }
}

class Temporary  {
  constructor() {
    this.hourly = "$10";
  }
}

class Contractor {
  constructor() {
    this.hourly = "$20";
  }
}

const factory = new Factory();

const fulltimeEmployee = factory.createEmployee('fulltime');
const parttimeEmployee = factory.createEmployee('parttime');

fulltimeEmployee.say();
parttimeEmployee.say();