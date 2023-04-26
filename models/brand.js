const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Brand", brandSchema);