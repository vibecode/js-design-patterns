//The decorator pattern is used to wrap and augment an existing class.
//It extends (decorates) an object’s behavior dynamically.
//Using a decorator pattern is an alternative to subclassing an existing component.

class MacBook {
  constructor(cost, screenSize) {
    this.cost = cost;
    this.screenSize = screenSize;
  }

  getCost() {
    return this.cost;
  }

  getScreenSize() {
    return this.screenSize;
  }
}

//decorator 1
function Engraving(macbook) {
  const oldCost = macbook.getCost();
  macbook.getCost = function () {
    return oldCost + 49;
  }
}

//decorator 2
function Insurance(macbook) {
  const oldCost = macbook.getCost();
  macbook.getCost = function () {
    return oldCost + 249;
  }
}

//decorator 3
function Memory(macbook) {
  const oldCost = macbook.getCost();
  macbook.getCost = function () {
    return oldCost + 299;
  }
}

const macbook = new MacBook(999, 13.3);
Memory(macbook);
Engraving(macbook);
Insurance(macbook);

console.log(macbook.getCost());
console.log(macbook.getScreenSize());

/*=================== variation  ====================*/

class BasicArmor {
  calcDamage(hit) {
    return hit.strength;
  }
}

//decorator
class ChainMail {
  constructor(armor) {
    this.decoratedArmor = armor;
  }

  calcDamage(hit) {
    hit.strength = hit.strength * .8;
    return this.decoratedArmor.calcDamage(hit);
  }
}

const armor = new BasicArmor();
const reinforcedArmor = new ChainMail(armor);

console.log(armor.calcDamage({strength: 1}));
console.log(reinforcedArmor.calcDamage({strength: 1}));
