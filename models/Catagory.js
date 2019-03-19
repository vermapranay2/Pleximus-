const mongoose = require('mongoose');

const CatagorySchema = new mongoose.Schema({
    name: String,
    field: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Field'
    },
    tags: String,
    img: { data: Buffer, contentType: String },
    discription: String,
    status: {type: Number, default: 0},
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },


})
module.exports = Catagory;