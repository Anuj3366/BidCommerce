const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:1234', credentials: true}));
app.use(bodyParser.json());
app.use('/', router);
const connectDB = require('./mongoDB');
connectDB();

const cart = require('./api/cart');
app.use('/', cart);
console.log("2");
const getAllItems = require('./api/getAll');
app.use('/', getAllItems);
console.log("1");
const checkout = require('./api/checkout');
app.use('/', checkout);
console.log("3");
const login = require('./api/login');
app.use('/', login);
console.log("4");
const postAll = require('./api/postAll');
app.use('/', postAll);
console.log("5");
const update = require('./api/update');
app.use('/', update);
console.log("6");
const webhook = require('./api/webhook');
app.use('/', webhook);
console.log("7");
const account = require('./api/account');
app.use('/', account);
console.log("8");

console.log("All routes are running");



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});