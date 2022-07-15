const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adm: {
        type: Boolean,
        default: false
    }
}, {strict: false});

module.exports = mongoose.model('users', PostSchema)