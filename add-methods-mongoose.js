var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  //console.log("We're connected!");
  var personSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    phone: String,
    address: String
   });
   
 
   //add custom document instance method
   personSchema.methods.getName = function() {
       return this.firstName + " " + this.lastName;
   }

   //return a string representation of object
   personSchema.methods.printPerson = function() {
       return "First name: " + this.firstName +
         ", Last name: " + this.lastName + 
         ", Age: " + this.age +
         ", Email: " + this.email +
         ", Phone: " + this.phone + 
         ", Address: " + this.address
   }

   var Person = mongoose.model('Person', personSchema);

   //insert one object
   var annette = new Person({firstName: "Annette", lastName: "Arrigucci", age: "35", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
   annette.save(function (err) {
    if (err) return handleError(err);
    // saved!
    });
    /*
    //insert many objects into collection
    //these are raw objects
    var peopleArray = [
      { firstName: "John", lastName: "Doe", age: "21", email: "john@mailinator.com", phone:"111-111-1111", address: "Highway 71" },
      { firstName: "Peter", lastName: "Smith", age: "37", email: "peter@mailinator.com", phone:"222-222-2222", address: "Lowstreet 4"},
      { firstName: "Amy", lastName: "Lopez", age: "23", email: "amy@mailinator.com", phone:"333-333-3333", address: "Apple St 652" },
      { firstName: "Hannah", lastName: "Thomas", age: "24", email: "hannah@mailinator.com", phone:"444-444-4444", address: "Mountain 21" },
      { firstName: "Michael", lastName: "Parker", age: "25", email: "michael@mailinator.com", phone:"555-555-5555", address: "Valley 345" },
      { firstName: "Sandy", lastName: "Mitchell", age: "26", email: "sandy@mailinator.com", phone:"666-666-6666", address: "Ocean Blvd 2" },
      { firstName: "Betty", lastName: "Brown", age: "44", email: "betty@mailinator.com", phone:"777-777-7777", address: "Green Grass 1" },
      { firstName: "Richard", lastName: "Jones", age: "28", email: "richard@mailinator.com", phone:"888-888-8888", address: "Sky 331" },
      { firstName: "Susan", lastName: "Kennedy", age: "77", email: "susan@mailinator.com", phone:"999-999-9999", address: "Apple St 670" },
      { firstName: "Vicky", lastName: "Conoors", age: "55", email: "vicky@mailinator.com", phone:"101-101-1010", address: "Mountain 84" }
    ];
    
    Person.insertMany(peopleArray, function(error, docs) {
      if (error) return handleError(error);
    });
    */
    //try out the instance methods I added
    console.log("Get name of object: "+ annette.getName());
    console.log("Get string representation of object: " + annette.printPerson());
});