var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  //console.log("We're connected!");
  //add validation to the schema
  var personSchema = mongoose.Schema({
    firstName: { 
        type: String,
        //validate: /[a-z]/,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    age: { 
        type: Number,
        required: true,
        min: [18, 'Customer must be at least 18'],
        max: [72, 'Customer must be no older than 72']
    },
    email: { 
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'Customer phone number required']
    },
    address: { 
        type: String,
        required: true
    }
   });
   var Person = mongoose.model('Person', personSchema);

   
  
  
   
   //test the required validators
   var annette = new Person({firstName: "", lastName: "Arrigucci", age: "35", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
   annette.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });

    //test the age validators
    var john = new Person({firstName: "John", lastName: "Arrigucci", age: "2", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
    john.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });

    var jack = new Person({firstName: "Jack", lastName: "Arrigucci", age: "73", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
    jack.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });

    //test the phone number validator
    var christine = new Person({firstName: "Christine", lastName: "Arrigucci", age: "31", email: "annette.arrigucci@gmail.com", phone: "(555) 555-5555", address: "500 Broad Street"});
    christine.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });

    //try to insert a string into a Number type
    var mary = new Person({firstName: "Mary", lastName: "Arrigucci", age: "thirty-one", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
    mary.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });

     //try to insert a Number into a String type - this works, does not trigger the validation
    var alan = new Person({firstName: "1", lastName: "Arrigucci", age: "31", email: "annette.arrigucci@gmail.com", phone: "555-555-5555", address: "500 Broad Street"});
    alan.save(function (err) {
    if (err) {
        console.log(err.message);
      }
    });
    
});