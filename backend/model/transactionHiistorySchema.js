const mongoose = require('mongoose');

const transactionHistorySchema = new mongoose.Schema({

    date:{
        type : String, 
        default: Date,
    },
    from:{
        type: String,
    },
    to:{
        type: String,
    },
    price:{
        type: Number,
    },
});

const use = mongoose.model('Transaction Details',transactionHistorySchema);

module.exports = use;