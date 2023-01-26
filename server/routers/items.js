let express = require('express');
let router = express.Router();
let { Item } = require('../models/items');

router.post("/", async (req, res) => {
  
  let items = req.body || [];
  await Promise.all(items.map(async (item) => {
    return await Item.create(item);
  }));

  return res.status(201).json({message: "Successfully added items"});

});

router.get("/" ,async (req, res) => {
  let items = await Item.find();
  return res.status(200).json(items)
});

router.delete("/" ,async (req, res) => {
  await Item.deleteMany({});
  return res.status(201).json({message: "Successfully deleted items"});
});

module.exports = router;