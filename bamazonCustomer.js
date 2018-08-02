var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
    // selectAll();
  });

connection.ping(function (err) {
    if (err) throw err;
    console.log('Server responded to ping');
})

// function selectAll(){
//     connection.query('SELECT * FROM products', function (error, results, fields){
//         if (error) throw error;
//         console.log('The solution is: ', results[0].solution);
//       });
    
//     }

connection.end();

