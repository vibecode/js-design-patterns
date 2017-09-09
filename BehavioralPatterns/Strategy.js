// Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
//The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task. It allows a method to be swapped out at runtime by any other method (strategy) without the client realizing it. Essentially, Strategy is a group of algorithms that are interchangeable.

// Say we like to test the performance of different sorting algorithms to an array of numbers: shell sort, heap sort, bubble sort, quicksort, etc. Applying the Strategy pattern to these algorithms allows the test program to loop through all algorithms, simply by changing them at runtime and test each of these against the array. For Strategy to work all method signatures must be the same so that they can vary without the client program knowing about it.

class Shipping {
  constructor() {
    this.company = "";
  }

  setStrategy(company) {
    this.company = company;
  }

  calc(parcel) {
    return this.company.calc(parcel);
  }
}

class UPS {
  calc(parcel) {
    //calculations
    return "$33.99";
  }
}

class USPS {
  calc(parcel) {
    //calculations
    return "$44.44";
  }
}

class FEDEX {
  calc(parcel) {
    //calculations
    return "$11.11";
  }
}

const parcel = { from: "76712", to: "10012", weight: "1kg"};

const ups = new UPS();
const usps = new USPS();
const fedex = new FEDEX();

const shipping = new Shipping();

shipping.setStrategy(ups);
console.log(shipping.calc(parcel));

shipping.setStrategy(usps);
console.log(shipping.calc(parcel));

shipping.setStrategy(fedex);
console.log(shipping.calc(parcel));
