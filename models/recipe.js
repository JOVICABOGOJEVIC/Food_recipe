
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, 
        description: {
            type: String,
            trim:true,
            required: true,
            maxlength: 2000
        },
        ingredients: {
            type: String,
            trim:true,
            required: true,
            maxlength: 500
        },
        measure: {
            type: Number,
            trim:true,
            required: true,
            maxlength: 500
        },
        category:{
            type:ObjectId,
            ref:'Category',
            required:true
        },
        photo:{
            data:Buffer,
            contentType:String
        },
        video:{
            type:String,
            trim:true,
            required: true,
            maxlength: 500
        }

    },
    { timestamps: true }
);



module.exports = mongoose.model('Recipe', recipeSchema);



