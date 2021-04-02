const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req,res) =>{
    const{email,password} = req.body
    User.findOne({email},(err,user) => {
        if(err || !user){
return res.status(400).json({
    err:'User with that mail does not exsits. Please signup'
})
        }

if(!user.authenticate(password)){
    return res.status(401).json({
        error:'Email and password dont match'
    })
}

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, {expire: new Date()+9999})

        const {_id, firstName, lastName, email, role} = user
        return res.json({token, user: {_id, email,  firstName, lastName, role}});
    });
};



exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};