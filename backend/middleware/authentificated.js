const { verify } = require("../helpers/generateToken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    try {
        const tokenData = verify(req.cookies.token);
        const user = await User.findOne({ _id: tokenData.id });

        if (!user) {
            return res.status(401).send({ error: "Пользователь не найден" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({ error: "Ошибка авторизации" });
    }
};
