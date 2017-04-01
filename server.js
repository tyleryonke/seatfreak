// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Require Schema
var Project = require("./app/models/project");
var Person = require("./app/models/person");
var Table = require("./app/models/table");

// var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect("mongodb://heroku_0pn4q1bg:codsml6qqv82s1251vtujjqsfg@ds149030.mlab.com:49030/heroku_0pn4q1bg"); // connect to our database
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static("./public"));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'blahblahblah', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes =======================================================================

// // auth routes ===============================================================

//     // show the login links
//     app.get('/', function(req, res) {
//         res.sendFile(__dirname + '/loginpages/landing.html');
//     });

//     // PROFILE SECTION =========================
//     app.get('/profile', isLoggedIn, function(req, res) {
//         res.redirect('/index');
//     });

//     // LOGOUT ==============================
//     app.get('/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
//     });

// // =============================================================================
// // AUTHENTICATE (FIRST LOGIN) ==================================================
// // =============================================================================

//         // LOGIN ===============================
//         app.post('/login', passport.authenticate('local-login', {
//             successRedirect : '/index', // redirect to the secure profile section
//             failureRedirect : '/', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
//         }));

//         // SIGNUP =================================
//         app.post('/signup', passport.authenticate('local-signup', {
//             successRedirect : '/index', // redirect to the secure profile section
//             failureRedirect : '/', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
//         }));


// // route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/');
// }

// Route to get all saved projects
app.get("/api/saved/projects", function(req, res) {

 Project.find({})
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// Route to get all saved persons
app.get("/api/saved/people", function(req, res) {

 var project = req.param("project");
 console.log("param: " + project);

 Project.find({ name: project })
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        var peopleDoc = [];
        // doc[0].tables.map(function(person) {
        //         peopleDoc.push(person);
        if (doc[0]) {
            doc[0].tables.forEach(function(table) {
                if (table.people) {  
                    table.people.forEach(function(person) {
                        peopleDoc.push(person);
                    })
                }
            });
        }
        //});
        res.send(peopleDoc);
      }
    });
});

// Route to get all saved tables
app.get("/api/saved/tables", function(req, res) {

 var project = req.param("project");
 console.log("param: " + project);

 Project.find({ name: project })
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        if (doc) {
            if (doc[0]) {
                if (doc[0]) {
                    res.send(doc[0].tables);
                }
            }
        }
      }
    });
});

// Route to add a project to saved list
app.post("/api/saved/projects", function(req, res) {
  var newProject = new Project(req.body);

  console.log(req.body);

  newProject.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Route to add a person to saved list
app.post("/api/saved/people", function(req, res) {
  var newPerson = new Person(req.body);
  //var tableVar = "";

  Project.find({ name: req.body.project }).exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        var tableArr = doc[0].tables;
        function findTable(element) {
            return element.name === req.body.table;
        }
        var tableVar = tableArr.indexOf(tableArr.find(findTable))
        console.log("index: " + tableVar);
        
           console.log(req.body);
           var saveLocation = "tables." + tableVar + ".people";
           var query = {};

           query[saveLocation] = newPerson;
           console.log(saveLocation);

           Project.update({ name: req.body.project }, { $push: query }, function(err, status) {
                if (err) {
                    res.send('fail');
                } else {
                    res.send('pass');
                }
           });
      }
  });


});

// Route to add a table to saved list
app.post("/api/saved/tables", function(req, res) {
  var newTable = new Table(req.body);

  console.log(req.body);

  Project.update({ name: req.body.project }, { $push: { tables: newTable } }, function(err, status) {
        if (err) {
            console.log("fail: " + err);
        } else {
            console.log('pass' + status);
        }
  });
});

// Route to delete a project from saved list
app.delete("/api/saved/projects", function(req, res) {

  var name = req.param("name");

  Project.find({ name: name }).remove().exec(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Deleted");
    }
  });
});

// Route to delete a person from saved list
app.delete("/api/saved/people", function(req, res) {

       var firstName = req.param("firstName");
       var lastName = req.param("lastName");
       var table = req.param("table");
       var project = req.param("project");

    Project.find({ name: project }).exec(function(err, doc) {
        console.log("doc: "+ doc);
      if (err) {
        console.log(err);
      }
      else if (doc[0]) {
        var tableArr = doc[0].tables;
        function findTable(element) {
            return element.name === table;
        }
        var tableVar = tableArr.indexOf(tableArr.find(findTable));
        console.log("index: " + tableVar);
        
            if (tableVar == -1) {tableVar = "0";}
           console.log(req.body);
           var deleteLocation = "tables." + tableVar + ".people";
           var deletePerson = {firstName: firstName, lastName: lastName};
           var query = {};

           query[deleteLocation] = deletePerson;
           console.log(deleteLocation);

           Project.update({ name: project }, { $pull: query }, function(err, status) {
                if (err) {
                    console.log('fail');
                }
                else {
                    console.log("succeed")
                }
           });
      }
  });

// for reference
//   Project.update({ name: project }, { $pull: { tables: { name: name } } }, function(err, status) {
//         if (err) {
//             res.send('fail');
//         } else {
//             res.send('pass');
//         }
//   });
});

// Route to delete a table from saved list
app.delete("/api/saved/tables", function(req, res) {

  var name = req.param("name");
  var project = req.param("project");

//   Project.find({ name: project }).remove({table: name}).exec(function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Deleted");
//     }
//   });

  Project.update({ name: project }, { $pull: { tables: { name: name } } }, function(err, status) {
        if (err) {
            res.send('fail');
        }
  });
});

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// launch ======================================================================
app.listen(port);
console.log('Listening on port ' + port);
