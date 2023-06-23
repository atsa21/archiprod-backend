const path = require("path");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoriesRoutes = require("./routes/categories");
const brandsRoutes = require("./routes/brands");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const app = express();
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url)
.then(() => {
    console.log("Connected database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use(cors({ origin: true }));

app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/orders", ordersRoutes);

module.exports = app;