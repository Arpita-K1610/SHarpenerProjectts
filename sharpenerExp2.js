/*const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to show the form for adding a product
app.get('/add-product', (req, res) => {
  res.send(`
    <form action="/add-product" method="post">
      <label for="product-name">Product Name:</label>
      <input type="text" id="product-name" name="productName" required>

      <label for="product-size">Product Size:</label>
      <input type="text" id="product-size" name="productSize" required>

      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle the form submission
app.post('/add-product', (req, res) => {
  const productName = req.body.productName;
  const productSize = req.body.productSize;

  console.log('Product Name:', productName);
  console.log('Product Size:', productSize);

  res.send('Product added successfully!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/


const express=require('express');
const bodyParser=require('body-parser');

const app=express();
const port=5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/add-product',(req,res)=>{
  res.send(`
  <form action="/add-product" method="post">
  <lable for="productName">Product Name: </lable>
  <input type="text" id="product-Name" name="productName" required>
  <lable for="productSize">Product Size: </lable>
  <input type="text" id="product-Size" name="productSize" required>
  <button type="submit">Send</button>
  </form>
  `)
});

app.post('/add-product',(req,res)=>{
  const productName=req.body.productName;
  const productSize=req.body.productSize;

  console.log(productName);
  console.log(productSize);

  res.end('<h1>Product is added successfully! </h1>')
});

app.listen(port,()=>{
  console.log(`server is listening on port: http://localhost:${port}`);
});
