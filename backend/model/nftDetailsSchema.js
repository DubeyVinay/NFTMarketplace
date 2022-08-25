const mongoose = require('mongoose');

const nftDetailsSchema = new mongoose.Schema({

    nft__name:{
        type:String,
    },
    nft__Description:{
        type:String,
    },
    uri:{
        type:String,
    },
    token_id:{
        type:Number,
        // unique: false,
    },
    collection_address:{
        type:String,
    },
    nonce:{
        type:Number,
    },
    seller_address:{
        type:String,
    },
    owner_address:{
        type:String,
    },
    sale_amount:{
        type:Number,
    },
    signature:{
        type:String,
    },
    nft_address:{
        type: String,
    },
    payment_asset_address:{
        type: String,
    },
    royalty:{
        type: Number,
    },
    Imguri: {
        type: String,
    },
    saleType :{
        type : String,
    },
    start_time:{
        type : String, 
        default: Date,
    },
    end_time:{
        type:String,
        default: Date,
    },
    starting_amount:{
        type:Number,
    },
    reserve_amount:{
        type:Number,
    },
    decline_amount:{
        type:Number,
    },

});


const use = mongoose.model('NFTDtails',nftDetailsSchema);

module.exports = use;