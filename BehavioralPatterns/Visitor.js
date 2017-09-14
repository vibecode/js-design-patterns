// Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

// The Visitor pattern defines a new operation to a collection of objects without changing the objects themselves. The new logic resides in a separate object called the Visitor.

// Visitors are useful when building extensibility in a library or framework. If the objects in your project provide a 'visit' method that accepts a Visitor object which can make changes to the receiving object then you are providing an easy way for clients to implement future extensions.
//
// In most programming languages the Visitor pattern requires that the original developer anticipates functional adjustments in the future. This is done by including methods that accept a Visitor and let it operate on the original collection of objects.
//
// Visitor is not important to JavaScript because it offers far more flexibility by the ability to add and remove methods at runtime.

class Employee {
  constructor(name, salary, vacation) {
    this.name = name;
    this.salary = salary;
    this.vacation = vacation;
  }

  accept(visitor) {
    visitor.visit(this);
  }

  getName() {
    return this.name;
  }

  getSalary() {
    return this.salary;
  }

  setSalary(salary) {
    this.salary = salary;
  }

  getVacation() {
    return this.vacation;
  }

  setVacation(vacation) {
    this.vacation = vacation;
  }
}

class ExtraSalary {
  visit(employee) {
    employee.setSalary(employee.getSalary() * 1.5);
  }
}

class ExtraVacation {
  visit(employee) {
    employee.setVacation(employee.getVacation() + 3);
  }
}

const employees = [
  new Employee('NifNif', 10000, 0),
  new Employee('NafNaf', 10000, 0),
  new Employee('NufNuf', 10000, 0),
];

const visitorSalary = new ExtraSalary();
const visitorVacation = new ExtraVacation();

employees.forEach(emp => {
  emp.accept(visitorSalary);
  emp.accept(visitorVacation);
});

console.log(employees);