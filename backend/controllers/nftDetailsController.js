const mongoose = require('mongoose');
const nftDetailsSchema = require('../model/nftDetailsSchema');
require('express');

exports.create_nft_details = async function(req,resp){
    const data = new nftDetailsSchema(req.body);
    const result = await data.save();
    resp.send(result);
};

exports.get_nft_details = async function(req,resp){
    const data = await nftDetailsSchema.find();
    resp.send(data);
};

exports.delete_nft_details = async function(req,resp){
    const data = await nftDetailsSchema.deleteOne(req.params);
    resp.send(data);
};

exports.update_nft_details = async function(req,resp){
    console.log(req.params);
    const data = await nftDetailsSchema.updateOne(
        req.params,
        {
            $set:req.body
        }
    );
    resp.send(data);
}

