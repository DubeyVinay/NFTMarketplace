const mongoose = require('mongoose');

const nonceSchema = new mongoose.Schema({
    nonce:{
        type:Number,
        index:true,
        default: 100,
    }
});
const use = mongoose.model('nonceSchema',nonceSchema);

module.exports = use;