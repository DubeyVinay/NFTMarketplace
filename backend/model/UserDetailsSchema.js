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
    // token_id:{
    //     type:Number,
    // },
    // nft_address:{
    //     type:String,
    // },
    // seller_address:{
    //     type:String,
    // },
    // collection_address:{
    //     type:String,
    // },
    // sale_amount:{
    //     type:Number,
    // },
    
    // payment_asset_address:{
    //     type:String,
    // },
    // nonce:{
    //     type:String,
    // },
    // uri:{
    //     type:String,
    // },
    // nft__name:{
    //     type:String,
    // },
    // nft__Description:{
    //     type:String,
    // },
    // royalty:{
    //     type:Number,
    // },

    
    

});
const use = mongoose.model("userDetails",userDetailsSchema);

module.exports = use;