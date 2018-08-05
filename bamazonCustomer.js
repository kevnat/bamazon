var mysql = require('mysql');
var inquirer = require("inquirer");



var configImport = require('./config.js');

var connection = mysql.createConnection(configImport.config);


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
    .prompt([
      {
        name:"selection",
        type:"input",
        message:"Please enter ID of the product you'd like to buy"
      },
      {
        name: "quantity",
        type: "input",
        message:"How many would you like to buy?"
      }
   ])
    .then(function(answer) {
      let purchase = {
        item: answer.selection,
        quantity: answer.quantity
      };
      // let input = answer.selection;
      // let quantity = answer.quantity; 
      console.log("\n-------------------------"+ "\nYou've selected" + purchase.quantity + " unit(s) of item_id: " + purchase.item); 
      getProduct(purchase);
    });
  }

function getProduct(purchase){
    connection.query('SELECT product_name, department_name, stock_quantity FROM products WHERE item_id = ?',[purchase.item], 
    function(error, result) {
      if (error) throw error;
      console.log("Product Name: " + result[0].product_name + " | " + result[0].department_name + "\n-------------------------"+ 
      "\nThere are "+ result[0].stock_quantity + " left in stock.");
      let currentStock = result[0].stock_quantity;
      updateStock(currentStock,purchase);
    });
  }

  function updateStock(currentStock,purchase){
    let newStock = currentStock - purchase.quantity; 
    console.log(purchase.quantity + " Item(s) removed from inventory");
    console.log("There are now: " + newStock + " of item_id " + purchase.item);
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?',[newStock,purchase.item], 
    function(error, result){
      if (error) {
        throw error;
      } else if(newStock <= 0) {
        console.log("Insufficient Quantity!");
      } else {
        console.log("Thank you for your purchase" + 
      "\n-------------------------");
      }
    })
    displayCost(purchase);
  }
  function displayCost(purchase){
    connection.query('SELECT price FROM products WHERE item_id = ?',[purchase.item],
    function(error,result){
      if (error){
        throw error;
      } else {
        console.log(
          "# of Units: " + purchase.quantity + 
          "\nUnit Cost: $" + result[0].price +
          "\n-------------------------" + 
          "\nTotal: $" + result[0].price * purchase.quantity);
      }
  })
    connection.end();
  }
