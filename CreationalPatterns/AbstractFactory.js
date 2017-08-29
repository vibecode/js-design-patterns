// An Abstract Factory should be used where a system
// must be independent from the way
// the objects it creates are generated
// or it needs to work with multiple types of objects.

function Car({ model, year }) {
  this.model = model;
  this.year = year;
}

Car.prototype.drive = function () {
};
Car.prototype.breakDown = function () {
};

const AbstractVehicleFactory = (function () {
  const types = {};

  return {
    getVehicle: function (type, options) {
      const Vehicle = types[type];

      return Vehicle ? new Vehicle(options) : null;
    },
    registerVehicle: function (type, Vehicle) {
      const proto = Vehicle.prototype;
      // only register classes that fulfill the vehicle contract
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }

      return AbstractVehicleFactory;
    }
  }
})();

AbstractVehicleFactory.registerVehicle("car", Car);
const car = AbstractVehicleFactory.getVehicle("car", { model: 'jaguar', year: 1985 });
console.log(car);