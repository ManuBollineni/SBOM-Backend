const mongoose = require('mongoose');
const {Schema} = mongoose;

const componentSchema = new Schema({
    name: { type: String, required: true },
    version: { type: String },
    license: { type: String },
    supplier: { type: String },
    isVulnerable: { type: Boolean, default: false }
});

module.exports = mongoose.model("Components", componentSchema);