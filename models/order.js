const mongoose = require("mongoose");

const priceSchema = mongoose.Schema({
    finalPrice: { type: Number, required: true },
    currency: { type: String, required: true }
});

const productsSchema = mongoose.Schema({
    name: { type: String, required: true },
    itemCode : { type: String, required: true },
    price: priceSchema,
    amount: { type: Number, required: true }
});

const clientSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
});

const orderSchema = mongoose.Schema({
    client: clientSchema,
    shop: { type: String, required: true },
    order: [productsSchema],
    comment: { type: String },
    date: { type: String, required: true },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model("Order", orderSchema);