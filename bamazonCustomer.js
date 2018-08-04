var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jupiter47!',
    database: 'bamazon'
  });
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
    selectAll();
  });

function selectAll() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(res);
    for (var i = 0; i<res.length; i++){
      console.log(
        "Item ID: " + res[i].item_id +
        " || Department: " + res[i].department_name + 
        " || Product Name: " + res[i].product_name +
        " || Price: " + res[i].price +
        " || Stock: " + res[i].stock_quantity
      );
    }
    // connection.end();
    promptUser();
  });
}

function promptUser(){
  inquirer
    .prompt(//[
      {
        name:"selection",
        type:"input",
        message:"Please enter ID of the product you'd like to buy"
      }//,
      // {
      //   name: "quantity",
      //   type: "input",
      //   message:"How many would you like to buy?"
      // }
   // ]
  )
    .then(function(answer) {
      // let purchase = {
      //   item: answer.selection,
      //   quantity: answer.quantity
      // };
      let input = answer.selection;
      let quantity = answer.quantity; 
      console.log(input); 
      getProduct(input);
    });
  }

function getProduct(input){
    connection.query('SELECT product_name, stock_quantity FROM products WHERE item_id = ?',[input], function(error, result) {
      if (error) throw error;
      console.log("You've Selected: " + result[0].product_name + 
      "\nThere are "+ result[0].stock_quantity + " left in stock.");
      let currentStock = result[0].stock_quantity;
      updateStock(currentStock,input);
    });
  }

  function updateStock(currentStock, input){
    let newStock = currentStock - 1; 
    console.log("Item removed from inventory");
    console.log("There are now: " + newStock + " of item_id " + input);
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?',[newStock,input], function(error, result){
      if (error) {
        throw error;
      } else if(newStock <= 0) {
        console.log("Insufficient Quantity!");
      } else {
        console.log("Thank you for your purchase");
      }
    })
    connection.end();

  }
  // function displayCost(){
  //   connection.query("SELECT price")
   
    

  // }