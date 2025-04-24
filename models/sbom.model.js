const mongoose = require('mongoose');
const {Schema} = mongoose;

const sbomSchema = new Schema({
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
  // component: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sbom", sbomSchema);