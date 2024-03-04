const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);
const connectDB = require('./mongoDB');
connectDB();

const getAllItems = require('./api/getAll');
app.use('/', getAllItems);
const cart = require('./api/cart');
app.use('/', cart);
const checkout = require('./api/checkout');
app.use('/', checkout);
const login = require('./api/login');
app.use('/', login);
const postAll = require('./api/postAll');
app.use('/', postAll);
const update = require('./api/update');
app.use('/', update);
const webhook = require('./api/webhook');
app.use('/', webhook);
const account = require('./api/account');
app.use('/', account);

console.log("All routes are running");



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});