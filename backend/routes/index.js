const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/", require("./finances"));

module.exports = router;
