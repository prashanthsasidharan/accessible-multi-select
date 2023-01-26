let express = require('express');
let router = express.Router();
let { Order } = require('../models/orders');
let { Item } = require('../models/items')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.post("/", async (req, res) => {
  try {
    let data = req.body || {};
    let { orders } = data;

    let amount = orders.reduce((value, item) => value + item.amount * item.quantity, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount,
      automatic_payment_methods: { enabled: true },
    });

    await Promise.all(orders.map(async (order) => {
      let { _id, quantity, amount } = order || {};
      let { email, name, shipping } = data || {};
      console.log(email, name, shipping, _id, quantity, amount)
      await Order.create({
        itemId: _id,
        email,
        name,
        shipping,
        quantity,
        amount,
        pid: paymentIntent.id
      })
    }));

    // Send publishable key and PaymentIntent details to client
    res.status(201).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get("/" ,async (req, res) => {
  const { data: paymentIntents } = await stripe.paymentIntents.list({
    limit: 3,
  });

  let response = await Promise.all(paymentIntents.map(async (pI) => {
   let order = await Order.find({pid: pI.id});
   let [commonOrderDetails] = order;
   let { name, email, quantity, amount, pid } = commonOrderDetails;
   let items = await Promise.all(order.map(async (item) => await Item.find({_id: item.itemId})));
   console.log(pI.created);
   return {
    pid,
    name,
    email,
    quantity,
    amount,
    date: (new Date(pI.created)).toLocaleString(),
    total: pI.amount,
    items
   }
  }));

  return res.status(200).json(response)
});

module.exports = router