const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    typeName: { type: String, required: true },
    image: { type: String },
    brands: [{ type: String, required: true }],
    materials: [{ type: String, required: true }],
    shapes: [{ type: String, required: true}],
    extras: [{ type: String, required: true }]
});

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: [typeSchema],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Category", categorySchema);