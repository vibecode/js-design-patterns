// The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently.
// Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.

// The flyweight pattern is used in instances when there is a large number of instances
// of objects which only vary slightly. A large number, in this situation, is probably around 10,000 objects rather than 50 objects.

// Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects. (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).

// An example of the Flyweight Pattern is within the JavaScript engine itself which maintains a list of immutable strings that are shared across the application.
//Other examples include characters and line-styles in a word processor, or 'digit receivers' in a public switched telephone network application. You will find flyweights mostly in utility type applications such as word processors, graphics programs, and network apps; they are less often used in data-driven business type applications.
