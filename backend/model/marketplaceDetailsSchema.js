const mongoose = require('mongoose');

const MarketplaceDetailsSchema = new mongoose.Schema({
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
    uri:{
        type:String,
    },
    to_address:{
        type:String,
    },
    royalty:{
        type:Number,
    },
    nonce:{
        type:Number,
    },

    token_id:{
        type:Number,
    },
    nft_address:{
        type:String,
    },
    seller_address:{
        type:String,
    },
    collection_address:{
        type:String,
    },
    sale_amount:{
        type:Number,
    },
    payment_asset_address:{
        type:String,
    },
    nft_name:{
        type:String,
    },
    nft_Description:{
        type:String,
    }
    
});


const use = mongoose.model('MarketPlace',MarketplaceDetailsSchema);

module.exports = use;