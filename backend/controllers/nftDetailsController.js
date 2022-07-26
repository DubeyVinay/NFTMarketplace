const mongoose = require('mongoose');
const nftDetailsSchema = require('../model/nftDetailsSchema');
require('express');


const get_nft_details = async function(req,resp){
    try{
        const data = await nftDetailsSchema.find();
        resp.json(data);
    }catch (err) {
        res.json({ message: err })
    }
}
const create_nft_details = async function(req,resp){
    try{
        let tokenIdFromUI = req.body.token_id
        console.log("TokenIdfromUi is>>>>>",tokenIdFromUI);

        let data1 = await nftDetailsSchema.findOne({token_id : tokenIdFromUI});
        console.log("Data is",data1);

        if (data1 === null){
            const data = new nftDetailsSchema(req.body);
            console.log("Creating New Entry with token ID: ",data.token_id);
            const result = await data.save();
            console.log("result<<<<<<<<",result);

            resp.send(result);
            console.log("<<<<");
        }
        else {
            const data = await nftDetailsSchema.findOneAndUpdate(
                req.params.token_id,
                {
                    $set:req.body
                }
            );
            console.log("Update from existing data.");

            resp.send(data);
        }

        console.log("Outside else");
    }catch (err) {
        resp.json({ message: 'error', err })
        console.log('Error', err)
      }
};

const delete_nft_details = async function(req,resp){
    const data = await nftDetailsSchema.deleteOne(req.params);
    resp.send(data);
};
// const update_nft_details = async function(req,resp){
//     console.log(req.params);
//     const data = await nftDetailsSchema.updateOne(
//         req.params,
//         {
//             $set:req.body
//         }
//     );
//     resp.send(data);
// };



module.exports = {
    create_nft_details,
    get_nft_details,
    delete_nft_details,
    // update_nft_details
}