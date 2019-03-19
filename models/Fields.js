const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    name: String,
    img: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    

})

const Field = mongoose.model('Field', FieldSchema);
module.exports = Field;