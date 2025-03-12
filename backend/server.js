const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();

const PORT = 3007;
const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     })
// );
app.use(
    cors({
        origin: "http://147.45.161.16",
        credentials: true,
    })
);

app.use(express.static("../frontend/build"));
app.use(cookieParser());

app.use(express.json());

app.use("/api", routes);

mongoose.connect(process.env.MONGODB_CONNECTION_API).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.blueBright(`Сервер запущен на порту ${PORT}`));
    });
});
