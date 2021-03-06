var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/test', function(err, db) {
  if (err) throw err;

  db.createCollection("mycustomers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");

    //first example - insert one object of type Person
    var person = { firstName: "Annette", lastName: "Arrigucci", age: "35", email: "annette.arrigucci@gmail.com", phone:"555-555-5555", address: "500 Broad Street" };

    db.collection("mycustomers").insertOne(person, function(err, res){
        if(err) throw err;
        console.log("Object of type person inserted using MongoClient")
    //db.close();
    });

    var people = [
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
    db.collection("mycustomers").insertMany(people, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
});