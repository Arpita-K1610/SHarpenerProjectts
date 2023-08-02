const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Niteesh@1995',
  database: 'CANDI_Todos' 
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create the candy_items table if it does not exist
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS candy_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      itemName VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      quantity INT NOT NULL,
      buy1 INT NOT NULL,
      buy2 INT NOT NULL,
      buy3 INT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating candy_items table:', err);
    }
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Fetch all candy items from the database
  dbConnection.query('SELECT * FROM candy_items', (err, results) => {
    if (err) {
      console.error('Error fetching candy items from database:', err);
      res.sendStatus(500);
    } else {
      const candyItems = results;
      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Candy Todo</title>
        </head>
        <body>
          <h1>Candy Todo</h1>
          <form action="/addItem" method="post">
            <label for="itemName">Item Name:</label>
            <input type="text" name="itemName" required>
            <label for="description">Description:</label>
            <input type="text" name="description" required>
            <label for="price">Price:</label>
            <input type="number" name="price" step="0.01" required>
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" required>
            <button type="submit">Add Item</button>
          </form>
          <hr>
      `;

candyItems.forEach((item, index) => {
  htmlContent += `
    <div>
      <h2>${item.itemName}</h2>
      <div>
        <label for="itemName">Item Name:</label>
        <input type="text" name="itemName" value="${item.itemName}" readonly>
        <label for="description">Description:</label>
        <input type="text" name="description" value="${item.description}" readonly>
        <label for="price">Price:</label>
        <input type="number" name="price" step="0.01" value="${item.price}" readonly>
        <label for="quantity">Quantity:</label>
        <input type="number" name="quantity" value="${item.quantity}" readonly>
      </div>
      <div>
        <h3>Buy1 Quantity:</h3>
        <input type="number" name="buy1" value="${item.buy1}" onchange="updateBuyQuantity(${index})">
        <h3>Buy2 Quantity:</h3>
        <input type="number" name="buy2" value="${item.buy2}" onchange="updateBuyQuantity(${index})">
        <h3>Buy3 Quantity:</h3>
        <input type="number" name="buy3" value="${item.buy3}" onchange="updateBuyQuantity(${index})">
      </div>
    </div>
    <hr>
  `;
});

      htmlContent += `
          <script>
            function updateBuyQuantity(index) {
              const buy1 = document.getElementsByName('buy1')[index].value;
              const buy2 = document.getElementsByName('buy2')[index].value;
              const buy3 = document.getElementsByName('buy3')[index].value;

              fetch('/addBuyQuantity', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: \`index=\${index}&buy1=\${buy1}&buy2=\${buy2}&buy3=\${buy3}\`
              })
              .then(() => {
                console.log('Buy quantities updated successfully.');
              })
              .catch((error) => {
                console.error('Error updating buy quantities:', error);
              });
            }
          </script>
        </body>
        </html>
      `;

      res.send(htmlContent);
    }
  });
});

app.post('/addItem', (req, res) => {
  const { itemName, description, price, quantity } = req.body;
  if (itemName && description && price && quantity) {
    const newItem = {
      itemName,
      description,
      price,
      quantity,
      buy1: 0,
      buy2: 0,
      buy3: 0
    };

    dbConnection.query('INSERT INTO candy_items SET ?', newItem, (err) => {
      if (err) {
        console.error('Error adding candy item to database:', err);
        res.sendStatus(500);
      } else {
        res.redirect('/');
      }
    });
  }
});

app.post('/addBuyQuantity', (req, res) => {
  const { index, buy1, buy2, buy3 } = req.body;
  if (index !== undefined) {
    const item = candyItems[index];
    dbConnection.query(
      'UPDATE candy_items SET buy1=?, buy2=?, buy3=? WHERE id=?',
      [buy1, buy2, buy3, item.id],
      (err) => {
        if (err) {
          console.error('Error updating buy quantities in database:', err);
          res.sendStatus(500);
        } else {
          res.redirect('/');
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
