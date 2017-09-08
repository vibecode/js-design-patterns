// Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.

// The Memento pattern provides temporary storage as well as restoration of an object. The mechanism in which you store the object’s state depends on the required duration of persistence, which may vary.

// Participants:
//  Originator -- implements interface to create and restore mementos of itself
//  the object which state is temporary being saved and restored
//  Memento -- internal state of the Originator object in some storage format
//  CareTaker -- responsible for storing mementos, just a repository; does not make changes to mementos

// The Memento pattern itself with CareTaker etc. is rarely used in JavaScript. However, JSON is a highly effective data format that is extremely useful in many different data exchange scenarios.

class Person {
  constructor(name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
  }

  hydrate() {
    return JSON.stringify(this);
  }

  dehydrate(memento) {
    const m = JSON.parse(memento);

    for (let key in m) {
      this[key] = m[key];
    }
  }
}

class CareTaker {
  constructor() {
    this.mementos = {};
  }

  add(key, memento) {
    this.mementos[key] = memento;
  }

  get(key) {
    return this.mementos[key];
  }
}

const vitya = new Person("Viktor Pelevin", "2321bh", 'Boston', 'MA');
const edik = new Person("Eduard Limonov", "24th street", "New York", "NY");

const caretaker = new CareTaker();

caretaker.add(1, vitya.hydrate());
caretaker.add(2, edik.hydrate());

vitya.name = "Petr Pustota";
edik.name = "Edichka";

vitya.dehydrate(caretaker.get(1));
edik.dehydrate(caretaker.get(2));

console.log(vitya.name);
console.log(edik.name);