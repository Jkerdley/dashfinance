require("dotenv").config();

const jwt = require("jsonwebtoken");
const sign = process.env.JWT_SECRET;

module.exports = {
    generate(dataset) {
        return jwt.sign(dataset, sign, { expiresIn: "30d" });
    },
    verify(token) {
        return jwt.verify(token, sign);
    },
};
