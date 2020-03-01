const express = require("express");

const executeAPI = require("./v1/execute");
const targetAPI = require("./v1/target");
const triggerAPI = require("./v1/trigger");
const userAPI = require("./v1/user");

const router = express.Router();

router.use("/v1/execute", executeAPI);
router.use("/v1/target", targetAPI);
router.use("/v1/trigger", triggerAPI);
router.use("/v1/user", userAPI);

module.exports = router;
