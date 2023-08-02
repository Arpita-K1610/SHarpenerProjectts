const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

//Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Niteesh@1995',
  database: 'BookingAppointment',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// API routes
app.post('/api/users', (req, res) => {
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  db.query(query, [name, email, phone], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error inserting user.' });
    } else {
      res.status(201).json({ message: 'User inserted successfully.' });
    }
  });
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error fetching users.' });
    } else {
      res.json(results);
    }
  });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error deleting user.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
