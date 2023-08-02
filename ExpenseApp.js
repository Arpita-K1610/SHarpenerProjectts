const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3008;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Niteesh@1995',
  database: 'expense_tracker',
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Create a new expense
app.post('/api/expenses', (req, res) => {
  const expenses = req.body;

  const deleteSql = 'DELETE FROM expenses';
  connection.query(deleteSql, (err) => {
    if (err) {
      console.error('Error deleting expenses:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const insertSql = 'INSERT INTO expenses (expense, amount) VALUES ?';
      const values = expenses.map(expense => [expense.expense, expense.amount]);
      connection.query(insertSql, [values], (insertErr) => {
        if (insertErr) {
          console.error('Error creating expenses:', insertErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// Get all expenses
app.get('/api/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting expenses:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
