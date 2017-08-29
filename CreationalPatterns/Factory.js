// deals with the problem of creating
// objects (which we can think of as ‘factory products’)
// without the need to specify the exact class of object being created.

// Specifically, the Factory Pattern suggests defining an interface for creating an object
// where you allow the subclasses to decide which class to instantiate.

// When To Use The Factory Pattern
//
// • When your object's setup requires a high level of complexity
// • When you need to generate different instances depending on the environment
// • When you're working with many small objects that share the same properties
// • When composing classes with instances of other classes that need only satisfy an
// API contract (aka, duck typing) to work. This is useful for decoupling.

// When Not To Use The Factory Pattern:

// It's generally a good practice to not use the factory
// pattern in every situation as it can easily add an unnecessarily additional aspect of complexity to your code.
// It can also make some tests more difficult to run.

function Car({ model, year }) {
  this.model = model;
  this.year = year;
}

function Truck({ enclosedCargo, length }) {
  this.enclosedCargo = enclosedCargo;
  this.length = length;
}

function VehicleFactory() {
};
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.getVehicle = function (opt) {
  return new this.vehicleClass(opt);
};

const carFactory = new VehicleFactory();
const car = carFactory.getVehicle({ color: 'yellow', year: '1989' });
console.log(car instanceof Car); // => true

// approach #1: Modify a VehicleFactory instance to use the Truck class
carFactory.vehicleClass = Truck;
const mover = carFactory.getVehicle({ enclosedCargo: true, length: 26 });
console.log(mover instanceof Truck); // => true

// approach #2: Subclass VehicleFactory to create a factory class that
// builds Trucks

function TruckFactory() {
};
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

const truckFactory = new TruckFactory();
const bigFoot = truckFactory.getVehicle({ enclosedCargo: true, length: 26 });
console.log(bigFoot instanceof Truck); //=> true;
