const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Recipe = require("../models/recipe");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.recipeById = (req, res, next, id) => {
    Recipe.findById(id)
        .populate('category')
        .exec((err, recipe) => {
            if (err || !recipe) {
                return res.status(400).json({
                    error: 'Recipe not found'
                });
            }
            req.recipe = recipe;
            next();
        });
};

exports.read = (req, res) => {
    req.recipe.photo = undefined;
    return res.json(req.recipe);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
  

        let recipe = new Recipe(fields);


        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            recipe.photo.data = fs.readFileSync(files.photo.path);
            recipe.photo.contentType = files.photo.type;
        }

        recipe.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let recipe = req.recipe;
    recipe.remove((err, deletedRecipe) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            deletedRecipe,
            message: 'Recipe deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
  

        let recipe = req.recipe;
        recipe = _.extend(recipe, fields)


        if (files.photo) {
         
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            recipe.photo.data = fs.readFileSync(files.photo.path);
            recipe.photo.contentType = files.photo.type;
        }

        recipe.save((err, result) => {
            if (err) {
             
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


exports.list = (req, res) => {
    Recipe.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
