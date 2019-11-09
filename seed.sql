DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(5, 2) NOT NULL,
	stock INT,
	PRIMARY KEY (item_id)
);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Moldy Bread', 'Kids', 73.14, 38);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Versatainer', 'Games', 20.05, 33);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Mushrooms', 'Computers', 93.59, 65);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Split Peas', 'Clothing', 91.52, 2);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Salt Chips', 'Garden', 40.47, 11);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Catfish', 'Baby', 91.79, 82);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Containter', 'Computers', 69.34, 94);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Nantuckets', 'Computers', 8.28, 82);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Watermelon', 'Jewelery', 57.92, 5);

INSERT INTO
	products (product_name, department_name, price, stock)
VALUES
	('Veal & Guts', 'Health', 2.04, 38);

SELECT
	*
FROM
	products;