const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
   
}, {strict: false});

module.exports = mongoose.model("posts", PostSchema)