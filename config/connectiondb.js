const mongoose = require('mongoose');

const URI = process.env.MONGOBD_URI
mongoose.connect(URI)

module.exports = mongoose