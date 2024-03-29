const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/user');
const { userById } = require('../controllers/userId');

router.get('/secret/:userId', requireSignin, isAuth, (req, res) =>{
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)

module.exports = router;