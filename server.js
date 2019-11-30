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
// Serve index.handlebars to the root route
app.get('/', (req, res) => {
    //handlebars requires an object be sent to the index.handlebars file
    connection.query('SELECT * FROM burgers', (err, rows)=> {

  //  const leftSide = rows.filter(row => row.devored  );
  //  const rightSide = rows.filter(row => !row.devored  );
//  res.render('index', { animals: animals});
  res.render('index', { burgers: rows});


//        res.render("index", {burgers: rows});
    });

});
 

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });