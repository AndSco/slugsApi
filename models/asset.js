const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  backstageId: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;
