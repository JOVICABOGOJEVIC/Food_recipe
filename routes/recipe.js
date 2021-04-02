const express = require('express');
const router = express.Router();
const { create, recipeById, read, remove, update, list} = require('../controllers/recipe');
const { requireSignin, isAuth } = require('../controllers/user');
const {userById} = require('../controllers/userId');
const Recipe = require('../models/recipe');

router.get('/recipe/:recipeId', read);
router.post('/recipe/create/:userId', requireSignin, isAuth , create);
router.delete('/recipe/:recipeId/:userId', requireSignin, isAuth , remove)
router.put('/recipe/:recipeId/:userId', requireSignin, isAuth , update)
router.get('/recipes', list)


router.param('userId', userById)
router.param('recipeId', recipeById)

module.exports = router;