const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        role: { type: String, required: true },
        createdAt: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "user");

module.exports = User;
