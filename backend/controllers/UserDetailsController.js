const mongoose = require('mongoose');
const userDetailsSchema = require('../model/UserDetailsSchema');
require('express');

exports.create_user_details = async function(req,resp){
    const data = new userDetailsSchema(req.body);
    const result = await data.save();
    resp.send(result);
};

exports.get_user_details = async function(req,resp){
    const data = await userDetailsSchema.find();
    resp.send(data);
};

exports.delete_user_details = async function(req,resp){
    const data = await userDetailsSchema.deleteOne(req.params);
    resp.send(data);
};

exports.update_user_details = async function(req,resp){
    console.log(req.params);
    const data = await userDetailsSchema.updateMany(req.params,
        {
            $set:req.body
        }
    );
    resp.send(data);
}

