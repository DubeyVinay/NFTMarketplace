const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({

    user_name:{
        type: String,
    },
    user_address:{
        type: String,
    },
    collection_details:{
        type: Number,
    },

});
const use = mongoose.model("userDetails",userDetailsSchema);

module.exports = use;