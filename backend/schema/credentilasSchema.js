const mongoose = require('mongoose');

const credentilasSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Credentials", credentilasSchema)