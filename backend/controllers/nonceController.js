const mongoose = require('mongoose');
const nonceSchema = require('../model/nonceSchema');
require('express');


const get_nonce = async function(req,res){
    const  currentNonce = req.body.nonce
    console.log("currentNonce",currentNonce);
    // console.log(req.params);
    try{
        const data = await nonceSchema.find();
        res.json(data);
    }catch (err) {
        res.json({ message: err })
        console.log('Error', err)

    }
}
// const create_nft_details = async function(req,res){
//     try{
//         let tokenIdFromUI = req.body.token_id
//         console.log("TokenIdfromUi is>>>>>",tokenIdFromUI);

//         let data1 = await nftDetailsSchema.findOne({token_id : tokenIdFromUI});
//         console.log("Data is",data1);
        
//         // await nftDetailsSchema.remove();
//         // if (!data1){
//         //     const data = new nftDetailsSchema(req.body);
//         //     console.log("Creating New Entry with token ID: ",data.token_id);
//         //     const result = await data.save();
//         //     console.log("result<<<<<<<<",result);

//         //     res.send(result);
//         //     console.log("<<<<");
//         // }

//         console.log("tokenIdFromUI", tokenIdFromUI)

//         if (!data1 || tokenIdFromUI == 0){
//             console.log("inside if");
//             // const data = new nftDetailsSchema(req.body);
//             // console.log("Creating New Entry with token ID: ",data.token_id);
//             // 
//             const result = await nftDetailsSchema.create(req.body);
//             console.log("result<<<<<<<<",result);

//             res.send(result);
//         }
//         else if(tokenIdFromUI){
//             console.log("Inside else if");
            
//             const data = await nftDetailsSchema.updateOne(
//                 {token_id:tokenIdFromUI},
//                 {
//                     $set:req.body
//                 }

//             );
//             console.log("Update from existing data.",data);

//             res.send(data);
//         }

//         console.log("Outside else");
//     }catch (err) {
//         res.json({ message: 'error', err })
//         console.log('Error', err)
//       }
// };

// const delete_nft_details = async function(req,res){
//     const data = await nftDetailsSchema.deleteOne(req.params);
//     res.send(data);
// };
const update_nonce = async function(req,res){

    let  NonceToBeUpdateWith = req.body.nonce
    console.log("NonceToBeUpdateWith>>>>>>",NonceToBeUpdateWith);
    let CurrentNonce = req.params.nonce
    console.log("CurrentNonce",CurrentNonce);
    let UpdateNonce = 1 + + parseInt(CurrentNonce);
    console.log("updated nonce",UpdateNonce);
    try{
        // console.log("Inside try");
        if(UpdateNonce){

            console.log("Inside if");

     
            const data = await nonceSchema.updateOne(
                req.params,
                {
                   $set:req.body
                }
        );
        res.send(data);
        console.log("here>>>>>",data);
    }
    else{
        console.log("Else");
    }
    }catch(err) {
        res.json({ message: err })
    }
};



module.exports = {
    // set_nonce,
    get_nonce,
    update_nonce
}