// Separate the construction of a complex object from its representation so that the same construction process can create different representations.

// The Builder pattern allows a client to construct a complex object by specifying the type and content only. Construction details are hidden from the client entirely.

// Allows you to create different flavors of an object while avoiding constructor pollution. Useful when there could be several flavors of an object. Or when there are a lot of steps involved in creation of an object.

// The builder pattern is an object creation software design pattern with the intentions of finding a solution to the telescoping constructor anti-pattern:

// constructor(size, cheese = true, pepperoni = true, tomato = false, lettuce = true) {
//   // ...
// }

// Participants:
//   Director -- constructs products by using the Builder's multistep interface
//   Builder -- (not used in JavaScript) declares a multistep interface for creating a complex product
//   ConcreteBuilder -- implements the multistep Builder interface, maintains the product through the assembly process, offers the ability to retrieve the newly created product
//   Products -- represents the complex objects being assembled

class Burger {
  constructor(size) {
    this.size = size;
    this.cheeze = false;
    this.pepperoni = false;
    this.lettuce = false;
    this.tomato = false;
  }
}

class BurgerBuilder {
  constructor(size) {
    this.burger = new Burger(size);
  }

  addPepperoni() {
    this.burger.pepperoni = true;
  }

  addLettuce() {
    this.burger.lettuce = true;
  }

  addCheeze() {
    this.burger.cheeze = true;
  }

  addTomato() {
    this.burger.tomato = true;
  }

  get() {
    return this.burger;
  }
}

class BurgerChief {
  makeBurger(builder) {
    builder.addCheeze();
    builder.addLettuce();
    builder.addPepperoni();
    return builder.get();
  }
}

const burgerBuilder = new BurgerBuilder(13);

const burger = new BurgerChief().makeBurger(burgerBuilder);
console.log(burger);
