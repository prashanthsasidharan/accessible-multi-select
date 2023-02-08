const express = require("express");
// const { resolve } = require("path");
require("dotenv").config();
var cors = require('cors')
var app = express();
app.use(express.json()); // post call will not work without this 

// Routers import

let itemsRouter = require('./routers/items');
let ordersRouter = require('./routers/orders');
let fillerRouter = require('./routers/filler');

// mongoose db;
let mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
let db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db started'))

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/assets/index.html');
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.use('/item', itemsRouter);
app.use('/order', ordersRouter);
app.use('/filler/form', fillerRouter);

app.listen(process.env.PORT, () =>
  console.log(`Node server listening at ${process.env.PORT}`)
);
