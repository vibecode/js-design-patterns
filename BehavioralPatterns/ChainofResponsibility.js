// Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
// Chain the receiving objects and pass the request along the chain until an object handles it.

// The Chain of Responsibility pattern provides a chain of loosely coupled objects one of which can satisfy a request.
// This pattern is essentially a linear search for an object that can handle a particular request.

//Use when:

//more  then one  object can handle the request and the handler isn't known a priory
//yo want to issue a request to one of several objects without specifying the receiver explicitly
//the set of objects that can handle a request should be specified dynamically

class Account {
  setNext(account) {
    this.successor = account;
  }

  pay(amount) {
    if (this.canPay(amount)) {
      console.log(`Paid ${amount} using ${this.name}.`);
    } else if (this.successor) {
      console.log(`Cannot pay using ${this.name}. Trying to pay using ${this.successor.name}...`);
      this.successor.pay(amount);
    } else {
      console.log('None of your accounts have enough balance.');
    }
  }

  canPay(amount) {
    return this.balance >= amount;
  }
}

class Bank extends Account {
  constructor(balance) {
    super();
    this.name = 'bank';
    this.balance = balance;
  }
}

class PayPal extends Account {
  constructor(balance) {
    super();
    this.name = 'paypal';
    this.balance = balance;
  }
}

class Ethereum extends Account {
  constructor(balance) {
    super();
    this.name = 'ethereum';
    this.balance = balance;
  }
}

const bank = new Bank(150);
const paypal = new PayPal(220);
const ethereum = new Ethereum(300);

bank.setNext(paypal);
paypal.setNext(ethereum);

bank.pay(299);
