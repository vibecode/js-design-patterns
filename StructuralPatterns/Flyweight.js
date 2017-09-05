// The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently.
// Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.

// The flyweight pattern is used in instances when there is a large number of instances
// of objects which only vary slightly. A large number, in this situation, is probably around 10,000 objects rather than 50 objects.

// Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects. (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).

// An example of the Flyweight Pattern is within the JavaScript engine itself which maintains a list of immutable strings that are shared across the application.
//Other examples include characters and line-styles in a word processor, or 'digit receivers' in a public switched telephone network application. You will find flyweights mostly in utility type applications such as word processors, graphics programs, and network apps; they are less often used in data-driven business type applications.

//Implementation by Addy Osmani:

//Consider library where each book would be represented as follows:

class Book {
  constructor(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = dueReturnDate;
    this.availability = availability;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }

  getISBN() {
    return this.ISBN;
  }

  /*other getters not shown for brevity*/
  updateCheckoutStatus(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
    this.id = bookID;
    this.availability = newStatus;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
  }

  extendCheckoutPeriod(bookID, newReturnDate) {
    this.id = bookID;
    this.dueReturnDate = newReturnDate;
  }

  isPastDue(bookID) {
    const currentDate = new Date();

    return currentDate.getTime() > Date.parse(this.dueReturnDate);
  }
}

// Using thousands of book objects with multiple versions and copies of each book available may overwhelm the available memory,
// but we can optimize our system using the flyweight pattern to improve this.

// We can separate our data into intrinsic and extrinsic states as follows: data relevant to the book object (title, author etc) is intrinsic whilst the checkout data (checkoutMember, dueReturnDate etc) is considered extrinsic. Effectively this means that only one Book object is required for each combination of book properties. it's still a considerable quantity of objects, but significantly fewer than we had previously.

// Flyweight optimized version
class BookFlyweigth {
  constructor(title, author, genre, pageCount, publisherID, ISBN) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
  }
}

//Let's  define a basic factory. Its mission to check if a book with a particular title has been previously created inside the system. If it has, we will return it.
//If not, a new book will be created and stored so that it can be accessed later.

/*Book Factory singleton */
class BookFactory {
  constructor(bookFlyweigth) {
    this.existingBooks = {};
    this.Book = bookFlyweigth;
  }

  createBook(title, author, genre, pageCount, publisherID, ISBN) {
    const existingBook = this.existingBooks[ISBN];

    if (existingBook) {
      return existingBook;
    }

    const book = new this.Book(title, author, genre, pageCount, publisherID, ISBN);

    this.existingBooks[ISBN] = book;
    return book;
  }
}

// Next, we need to store the states that were removed from the Book objects somewhere - luckily a manager (which we'll be defining as a singleton) can be used to encapsulate them. Combinations of a Book object and the library member that's checked them out will be called Book records. Our manager will be storing both and will also include checkout related logic we stripped out during our flyweight optimization of the Book class.

/*BookRecordManager singleton*/
class BookRecordManager {
  constructor(bookfactory) {
    this.bookRecordDatabase = {};
    this.bookFactory = bookfactory;
  }

  addBookRecord(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
    const book = this.bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);

    this.bookRecordDatabase[id] = {
      checkoutMember,
      checkoutDate,
      dueReturnDate,
      availability,
      book
    }
  }

  updateCheckoutStatus(id, newStatus, checkoutDate, checkoutMember, newReturnDate) {
    const record = this.bookRecordDatabase[id];
    record.availability = newStatus;
    record.checkoutDate = checkoutDate;
    record.checkoutMember = checkoutMember;
    record.dueReturnDate = newReturnDate;
  }

  extendCheckoutPeriod(bookID, newReturnDate) {
    this.bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
  }

  isPastDue(bookID) {
    const currentDate = new Date();

    return currentDate.getTime() > Date.parse(this.dueReturnDate);
  }
}

const bookFactory = new BookFactory(BookFlyweigth);
const manager = new BookRecordManager(bookFactory);

manager.addBookRecord("12314324234", "Infinite jest", "David Foster Wallace", "post-postmodernism", "countless", "27835825", "9780316066525", "24.07.1983", "Viktor Pelevin", "24.07.2023", "available");
console.log(manager.bookRecordDatabase);
