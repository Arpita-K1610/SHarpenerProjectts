const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGE_FILE = 'messages.json';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('Publicc')); // Serve static files from the 'public' directory

app.post('/login', (req, res) => {
  const { username } = req.body;

  // Save the username in local storage (using cookies or session is recommended for real applications)
  res.cookie('username', username);

  res.redirect('/');
});

app.get('/', (req, res) => {
  const username = req.cookies.username;

  if (!username) {
    return res.redirect('/login');
  }

  res.sendFile(__dirname + '/Publicc/sendMessage.html');
});

app.post('/send', (req, res) => {
  const username = req.cookies.username;
  const { message } = req.body;

  if (!username) {
    return res.status(401).send('Unauthorized');
  }

  // Read existing messages
  let messages = [];
  try {
    const data = fs.readFileSync(MESSAGE_FILE, 'utf8');
    messages = JSON.parse(data);
  } catch (err) {
    console.error('Error reading messages:', err);
  }

  // Append the new message
  messages.push({ username, message });

  // Save the updated messages to the file
  fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages), 'utf8');

  res.status(200).send('Message sent successfully');
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
