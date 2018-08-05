# bamazon
Bamazon, a music store command-line interface. 

## Configuration
Run sql found within schema.sql. 
Then create a config.js file with the following information specific to your local database: 
```
var config = {
    host: 'localhost',
    user: '',
    password: '',
    database: 'bamazon'
  };
```

exports.config = config;

## Usage 
To run, and see a listing of items in the stored, enter: 
```node bamazonCustomer.js```

From there, follow the prompts for which Item, and how many you'd like to purchase. 

``` 
? Please enter ID of the product you'd like to buy
? How many would you like to buy?
```

## Output
Users will be provided with the following information
```-------------------------
You've selected2 unit(s) of item_id: 6
Product Name: promark | drumsticks
-------------------------
There are 17 left in stock.
2 Item(s) removed from inventory
There are now: 15 of item_id 6
Thank you for your purchase
-------------------------
# of Units: 2
Unit Cost: $12
-------------------------
Total: $24
```
