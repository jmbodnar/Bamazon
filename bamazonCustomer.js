// ===== Requires & Variables ===== //
const mysql = require('mysql');
const inquirer = require('inquirer');
const colors = require('colors');

const orderDetails = [
  {
    name: 'item_id',
    message: 'What is the ID of what you want?'
  },
  {
    name: 'stock',
    message: 'How many do you want?'
  }
];

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'bamazon',
  user: 'root',
  password: 'docker'
});

// ===== Functions ===== //

function startOrders() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'continue',
      message: 'Would you like to buy something?'
    })
    .then(response => {
      if (response.continue) {
        console.log('\n> Great. Let me show you our inventory:');
        showInventory();
      } else {
        endProgram();
      }
    });
}

function showInventory() {
  connection.query('SELECT * FROM products', (error, rows) => {
    if (error) throw error;
    let inventory = rows
      .map(row => {
        return `\nID: ${row.item_id}\tProduct: ${row.product_name}\tDepartment: ${row.department_name}\tPrice: ${row.price}\tStock: ${row.stock}`;
      })
      .join('');
    console.log(colors.green(inventory + '\n'));
    getOrder();
  });
}

function getOrder() {
  inquirer.prompt(orderDetails).then(orderDetails => {
    runOrder(orderDetails);
  });
}

function runOrder(orderDetails) {
  connection.query(
    'UPDATE products SET stock = stock - ? WHERE item_id = ? AND stock >= ?',
    [orderDetails.stock, orderDetails.item_id, orderDetails.stock],
    (error, rows) => {
      // if (error) throw error;
      if (error) {
        console.log(
          colors.red(
            "\n> That's a bullshit, gibberish order. Let's try this again.\n"
          )
        );
        startOrders();
      } else if (rows.changedRows === 1) {
        displayMoneySpent(orderDetails.item_id, orderDetails.stock);
      } else {
        console.log(
          colors.red(
            "\n> Computer says, 'Insufficient quantity.' We can't sell that many. Let's try this again.\n"
          )
        );
        startOrders();
      }
    }
  );
}

function displayMoneySpent(item_id, amount_purchased) {
  connection.query(
    'SELECT * FROM products WHERE item_id = ?',
    [item_id],
    (error, rows) => {
      if (error) throw error;
      console.log(
        '\n> Okay. That comes to $' +
          Number(Number(rows[0].price) * Number(amount_purchased)).toFixed(2) +
          ". Let's do this again.\n"
      );
      startOrders();
    }
  );
}

function endProgram() {
  connection.end();
  return console.log(
    '\n> Okay. It was nice meeting you. See you some other time.'
  );
}

// ===== Inits & Listeners ===== //

startOrders();
