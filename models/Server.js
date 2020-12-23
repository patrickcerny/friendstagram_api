const { Server } = require("http");
const mongoose = require("mongoose");

const ServerSchema = mongoose.Schema({
  server_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("servers", ServerSchema);
