const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const dimensionsScema = mongoose.Schema({
    height: { type: Number, required: true },
    width: { type: Number },
    depth: { type: Number},
    diameter: { type: Number},
    measurementUnits: { type: String, required: true }
});

const priceSchema = mongoose.Schema({
    fullPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    isOnSale: { type: Boolean, default: false },
    discount: { type: Number },
    discountedPrice: { type: Number },
});

const detailsSchema = mongoose.Schema({
    collectionName: { type: String, required: true },
    shape: { type: String, required: true },
    materials: [{ type: String, required: true }],
    extras: [{ type: String, required: true }],
    productCode: { type: String, required: true, unique: true },
    year: { type: Number, required: false },
});

const productsSchema = mongoose.Schema({
    category: { type: String, required: true },
    type: { type: String, required: true },
    imagePath: { type: String, required: true },
    brand: { type: String, required: true },
    dimensions: dimensionsScema,
    price: priceSchema,
    details: detailsSchema,
    inStock: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

productsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", productsSchema);