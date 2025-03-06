const { generate } = require("../helpers/generateToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function getUser({ login, password }) {
    const user = await User.findOne({ login });
    return user;
}

async function registerNewUser({ login, password, role, name, avatar }) {
    if (!password) {
        throw new Error("Пароль пуст");
    }
    if (!login) {
        throw new Error("Логин пуст");
    }
    console.log("Логин и пароль получены");

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash");

    const user = await User.create({ login, password: passwordHash, role, name, avatar });
    console.log("user created");
    const token = generate({ id: user.id });
    return { user, token };
}

async function login(login, password) {
    const user = await User.findOne({ login });
    if (!login) {
        throw new Error("Пользователь не найден");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Пароль не правильный");
    }

    const token = generate({ id: user.id });
    return { token, user };
}

module.exports = {
    getUser,
    registerNewUser,
    login,
};
