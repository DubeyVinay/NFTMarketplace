const mongoose = require('mongoose');

const MarketplaceDetailsSchema = new mongoose.Schema({
    start_time:{
        type : String, 
        
    },
    end_time:{
        type:String,
        
    },
    starting_amount:{
        type:Number,
    },
    reserve_amount:{
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
    nft__name:{
        type:String,
    },
    nft__Description:{
        type:String,
    },
    sale_type: {
        type: String,
       
    },
    Imguri:{
        type: String,
    },
    signature:{
        type: String,
    },
    bidderAddress:{
        type: String,
    },
    bidPrice:{
        type:Number,
    },
    bidderSignature:{
        type:String,
    },
    bidTime:{
        type:String,
    }
    
});


const use = mongoose.model('MarketPlace',MarketplaceDetailsSchema);

module.exports = use;