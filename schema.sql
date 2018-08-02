DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

select * from products;

INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('stratocaster','guitars',200, 15);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('les paul','guitars',450, 5);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('martin','guitars',600, 10);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('pearl kit','drums',700, 6);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('dw kit','drums',3000, 2);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('promark','drumsticks',12, 20);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('vic firth','drumsticks',15, 24);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('hammond','keyboards',1500, 8);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('roland','keyboards',900, 19);
INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ('gretsch','bass',550, 8);

