// Dependencies
const express = require('express'); 
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

// Create an instance of the express app.
const app = express();

// Set port of app using Heroku guidelines
const PORT = process.env.PORT || 8080;

// use express.static middleware to serve static content from public directory in app directory
app.use(express.static('public'));

// sets up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Handlebars as the default templating engine.
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');


// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'burgers_db'
}); 
  

connection.connect( (err)=> {
    if (err) {
        console.log('error connecting: '+ err.statck);
        return;
    }
    console.log('connected as id ' +connection.threadId);
});

// ROUTES

app.get('/favicon.ico', (req, res) => {
    res.end();
  });
  
// Serve index.handlebars to the root route
app.get('/', (req, res) => {
    //handlebars requires an object be sent to the index.handlebars file
    connection.query('SELECT * FROM burgers', (err, rows)=> {

     res.render('index', { burgers: rows});

    });

});
 
// Post route -> back to home
app.post("/", function(req, res) {
    // Test it
    console.log('You sent, ' + [req.body.newburger]);
  
    // Test it
    // return res.send('You sent, ' + req.body.task);
  
    // When using the MySQL package, we'd use ?s in place of any values to be inserted,
    // which are then swapped out with corresponding elements in the array
    // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
    // https://en.wikipedia.org/wiki/SQL_injection
    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", 
    [req.body.newburger], function(err, result) {
      if (err) throw err;
  
      res.redirect("/");
    });
  });

  // Update.  see public/assets/js and see what update code does (update-form) "PUT"
app.put("/api/burgers/:id", function (req, res) {

    const query =  connection.query('UPDATE burgers SET devoured = true WHERE ? ',
    [ 
         { id: req.params.id }
    ], 
    (err, result) => {
      if (err) throw err;
      res.end();
    })
    console.log(query.sql);
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });