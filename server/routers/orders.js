let express = require('express');
let router = express.Router();
let { Order } = require('../models/orders');
let { Item } = require('../models/items')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

function formatStatus(status) {
  switch(status) {
    case 'requires_payment_method': return 'failed';
    case 'succeeded': return 'completed';
  }
}

function formatStatusText(status) {
  switch(status) {
    case 'requires_payment_method': return 'Failed';
    case 'succeeded': return 'Completed';
  }
}

router.post("/", async (req, res) => {
  try {
    let data = req.body || {};
    let { orders } = data;

    // let amount = await Promise.all(orders.reduce(async(valueP, item) => {
    //   let { amount } = await Item.findOne({_id: item._id})
    //   return value + amount * item.quantity;
    // }, Promise.resolve(0)));

    let totalAmount = 0;
    for (const item of orders) {
      let { amount } = await Item.findOne({_id: item._id});
      totalAmount = totalAmount + amount * item.quantity;
    }

  
    console.log(totalAmount);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: totalAmount,
      automatic_payment_methods: { enabled: true },
    });

    await Promise.all(orders.map(async (order) => {
      let { _id, quantity } = order || {};
      let { amount } = await Item.findOne({_id});
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
  try {
    const { data: paymentIntents } = await stripe.paymentIntents.list({
      limit: 6,
    });

    let response = await Promise.all(paymentIntents.map(async (pI) => {
    let orders = await Order.find({pid: pI.id});
    let [commonOrderDetails] = orders;
    let { name, email, pid } = commonOrderDetails;
    let items = await Promise.all(orders.map(async (orderItem) => {

      // quanity is not added to the items array as mongodb querys returns monogdb objects
      // So to get plain object used lean method
      // ref: https://stackoverflow.com/a/28157658/15962802
      console.log(orderItem)
      let item = await Item.findOne({_id: orderItem.itemId}).lean();
      item.quantity = orderItem.quantity;
      return item; 
      }));

    return {
      pid,
      name,
      email,
      date: (new Date(pI.created * 1000)).toLocaleString(),
      total: pI.amount,
      status: formatStatus(pI.status),
      formatted_status: formatStatusText(pI.status),
      items
    }
    }));
    return res.status(200).json(response)
  } catch(e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }

});

router.delete("/" ,async (req, res) => {
  await Order.deleteMany({});
  return res.status(201).json({message: "Successfully deleted orders"});
});

module.exports = router