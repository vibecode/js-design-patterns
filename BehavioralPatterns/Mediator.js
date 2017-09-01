//manages relationships between app components
//acts as a single place in which message routing changes can be made.

//PROS:
//Reduces the communication relationship from "many-to-many" to "many-to-one"
//Helps to pinpoint dependencies
//decoupling objects which often promotes smaller, reusable components

//CONS:
//Introduces a single point of failure
//When modules communicate back and forth using a mediator pattern, it tends to become cumbersome and usually results in a clear performance hit. It's best when the mediator is only used to coordinate actions across multiple features and not for communication within the individual features themselves; keep the airways clean! (via https://carldanley.com/js-mediator-pattern/)

class Lord {
  constructor(name) {
    this.name = name;
    this.greatLord = null;
  }

  receiveMessage(message) {
    console.log(`Lord ${this.name} received: "${message}"`);
  }

  sendMessage(message, to) {
    this.greatLord.routeMessage(message, to);
  }
}

class HouseStark {
  constructor() {
    this.houses = {};
  }

  addLord(lord) {
    this.houses[lord.name] = lord;
    lord.greatLord = this;
  }

  routeMessage(message, to) {
    if (to === undefined) {
      for (let name in this.houses) {
        this.houses[name].receiveMessage(message);
      }
    } else if (to in this.houses) {
      this.houses[to].receiveMessage(message);
    }
  }
}

const houseStark = new HouseStark();

const karstark = new Lord('Karstark');
const mormont = new Lord('Mormont');
const bolton = new Lord('Bolton');

houseStark.addLord(karstark);
houseStark.addLord(mormont);
houseStark.addLord(bolton);

bolton.sendMessage('I hate u all');
mormont.sendMessage('U r a dead man', 'Bolton');
