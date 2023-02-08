let express = require('express');
let router = express.Router();
let { Form } = require('../models/form');

// Get all forms
router.get('/', async (req, res) => {
  try {
    let forms = await Form.find();
    res.status(200).send({data: forms});
  } catch(err) {
    res.status(500).send({message: err.message});
  }
})

module.exports = router;