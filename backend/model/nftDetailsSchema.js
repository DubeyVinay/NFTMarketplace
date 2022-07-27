const mongoose = require('mongoose');

const nftDetailsSchema = new mongoose.Schema({

    title:{
        type:String,
    },
    description:{
        type:String,
    },
    token_uri:{
        type:String,
    },
    
    token_id:{
        type:Number,
        // unique: false,
    },
    collection_address:{
        type:String,
    },
    creater_address:{
        type:String,
    },
    owner_address:{
        type:String,
    },
    price:{
        type:Number,
    },
    signature:{
        type:String,
    }

});


const use = mongoose.model('NFTDtails',nftDetailsSchema);

module.exports = use;