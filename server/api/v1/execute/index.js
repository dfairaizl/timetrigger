const express = require('express');
const taskRunner = require('../../../lib/tasks');

const router = express.Router();

router.post('/', (req, res) => {
  const taskRuns = req.body;

  taskRunner(taskRuns)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
