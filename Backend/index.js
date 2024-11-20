const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');


// const Parse = require('parse/node');
// require('dotenv').config();

// Parse.initialize(process.env.APPLICATION_ID_BACK4APP,process.env.JAVASCRIPT_KEY_BACK4APP);
// Parse.serverURL = 'https://parseapi.back4app.com/';


// Middleware setup
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());

// Connect to MongoDB (assuming you have a separate file for this)
const connectDB = require('./mongoDB');
connectDB();

// Import your API routes
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

// const webhook = require('./api/webhook');
// app.use('/', webhook);

const account = require('./api/account');
app.use('/', account);

console.log("All routes are running");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../frontend/.next')));

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
