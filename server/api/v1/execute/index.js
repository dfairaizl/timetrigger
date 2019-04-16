const { inspect } = require('util');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(`Task run with payload ${inspect(req.body, { depth: 2 })}`);
  res.sendStatus(200);
});

module.exports = router;
