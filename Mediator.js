//manages relationships between app components
//acts as a single place in which message routing changes can be made.

//PROS:
//Reduces the communication relationship from "many-to-many" to "many-to-one"
//Helps to pinpoint dependencies
//decoupling objects which often promotes smaller, reusable components


//CONS:
//Introduces a single point of failure
//When modules communicate back and forth using a mediator pattern, it tends to become cumbersome and usually results in a clear performance hit. It's best when the mediator is only used to coordinate actions across multiple features and not for communication within the individual features themselves; keep the airways clean! (via https://carldanley.com/js-mediator-pattern/)


class AbstractHouse {
  constructor(greatLord) {
    this.greatLord = greatLord;
  }

  receiveMessage(message) {
    console.log(message);
  }

  sendMessage(to, message) {
    this.greatLord.routeMessage(to, message);
  }
}

class HouseStark {
  constructor() {
    this.houses = {
      karstark: new Lord(this),
      bolton: new Lord(this),
      frey: new Lord(this)
    }
  }

  routeMessage(to, message) {
    for (let name in this.houses) {
      if (name === to) {
        this.lords[name].receiveMessage(message);
      }
    }
  }
}

const houseStark = new HouseStark();
houseStark.houses.bolton.sendMessage('karstark', 'ty pidor');
