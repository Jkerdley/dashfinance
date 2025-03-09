const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth"));
router.use("/", require("./finances"));
router.use("/", require("./user"));

module.exports = router;
