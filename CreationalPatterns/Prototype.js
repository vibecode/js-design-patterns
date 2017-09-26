// Specify the kind of objects to create using a prototypical instance, and create new objects by copying this prototype.

// The Prototype Pattern creates new objects, but rather than creating non-initialized objects it returns objects that are initialized with values it copied from a prototype - or sample - object. The Prototype pattern is also referred to as the Properties pattern.

//This is the classical implementation of the Prototype pattern, but JavaScript can do this far more effectively using its built-in prototype facility

class CustomerPrototype {
  constructor(proto) {
    this.proto = proto;
  }

  clone() {
    const customer = new Customer();

    customer.first = this.proto.first;
    customer.last = this.proto.last;
    customer.status = this.proto.status;

    return customer;
  };
}

class Customer {
  constructor(first, last, status) {
    this.first = first;
    this.last = last;
    this.status = status;
  }

  say() {
    console.log("name: " + this.first + " " + this.last + ", status: " + this.status);
  }
}

const proto = new Customer("n/a", "n/a", "pending");
const prototype = new CustomerPrototype(proto);

const customer = prototype.clone();
customer.say();
