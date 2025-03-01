const express = require("express");
const router = express.Router({ mergeParams: true });

// router.use("/", require("./auth"));
// router.use("/users", require("./user"));
router.use("/", require("./finances"));

module.exports = router;
