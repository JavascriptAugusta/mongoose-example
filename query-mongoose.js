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
   var Person = mongoose.model('Person', personSchema);

   //insert one object
   var annette = new Person({firstName: "Annette", lastName: "Arrigucci", age: "35", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
   annette.save(function (err) {
    if (err) return handleError(err);
    // saved!
    });
    
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
      { firstName: "Vicky", lastName: "Connors", age: "55", email: "vicky@mailinator.com", phone:"101-101-1010", address: "Mountain 84" }
    ];
    
    Person.insertMany(peopleArray, function(error, docs) {
      if (error) console.log(error.message);

      //two approaches to building a query - first is with a callback function
      //first argument is a JSON object with our search parameters
        Person.findOne({ firstName: 'Hannah', lastName: 'Thomas'}, 'email phone', function (err, person) {
            if (err) {
                console.log(err.message);
            }
            console.log("First approach: Hannah Thomas contact info: "+ person.email, person.phone);
        });

        //second approach is to use query builder
        var query = Person.findOne({ 'firstName': 'Hannah' }).where('lastName').equals('Thomas').select('email phone');

        // execute the query at a later time
        //exec takes a callback function
        query.exec(function (err, person) {
            if (err) {
                console.log(err.message);
            }
            console.log("Second approach: Hannah Thomas contact info: "+ person.email, person.phone);
        });

        //more involved query - find all the residents of Apple Street who are under 25
        //return name and phone number
        var query2 = Person.find({ address: /Apple/i }).where('age').lt(25).select('firstName lastName phone');
        query2.exec(function (err, docs) {
            if (err) {
                console.log(err.message);
            }
            console.log("First resident of Apple St under 25: " + docs[0].firstName + " " + docs[0].lastName);
        });

        //loop through multiple results - all the residents of Mountain Street
        var query3 = Person.find({ address: /Mountain/i }).select('firstName lastName address');
        query3.exec(function (err, docs) {
            if (err) {
                console.log(err.message);
            }
            console.log("All the residents of Mountain Street")
            for(var i=0; i<docs.length; i++){
                console.log("Person " + i +": " + docs[i].firstName + " " + docs[i].lastName + " "+ docs[i].address);
            }
        });
    });  
});