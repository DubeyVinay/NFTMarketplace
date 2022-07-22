const mongoose = require('mongoose');
const flateSaleSchema = require('../model/transactionHiistorySchema');
require('express');

exports.TransactionHistory = async function(req,resp){
    const data = new transactionHiistorySchema(req.body);
    const result = await data.save();
    resp.send(result);
};

exports.get_TransactionHistory = async function(req,resp){
    const data = await transactionHiistorySchema.find();
    resp.send(data);
};

exports.delete_TransactionHistory = async function(req,resp){
    const data = await transactionHiistorySchema.deleteOne(req.params);
    resp.send(data);
};

exports.update_TransactionHistory = async function(req,resp){
    console.log(req.params);
    const data = await transactionHiistorySchema.updateOne(
        req.params,
        {
            $set:req.body
        }
    );
    resp.send(data);
}

