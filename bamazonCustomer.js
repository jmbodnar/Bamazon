/* 

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase. 

*/

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'bamazon',
  user: 'root',
  password: 'docker'
});

connection.query('SELECT * FROM products', (error, rows) => {
  if (error) throw error;
  let inventory = rows
    .map(row => {
      return `\nID: ${row.item_id}\tProduct: ${row.product_name}\tDepartment: ${row.department_name}\tPrice: ${row.price}\tStock: ${row.stock}`;
    })
    .join('');
  console.log(inventory);
});

connection.end();
