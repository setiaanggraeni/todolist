var User = require('../models/user')
var jwt = require('jsonwebtoken')
var FB = require('fb');
var bcrypt = require('bcryptjs')
const axios = require('axios')
require('dotenv').config()

class FbController{
    static getDataFromFb(req, res){
        FB.api('/me', {
            fields: ['id', 'name', 'email'], access_token: req.headers.token // fbtoken harus hruf kecil smua nama ini d lempar ke fb.js
        }, function(response) {
            console.log("==========> controller",response);
            User.findOne({
                email : response.email
            })
            .then(result => {
                if(result){
                        var token = jwt.sign({_id:result._id, email:result.email}, process.env.secretKey)
                            res.status(201).json(token)
                } else{
                    const saltRounds = 5;
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash = bcrypt.hashSync(response.id, salt);
                    User.create({
                        name: response.name,
                        email: response.email,
                        password: hash
                    })
                    .then(newUser => {
                        console.log("new User dini ===> ",newUser);
                        jwt.sign({_id:newUser._id, email:newUser.email}, process.env.secretKey, function(err, token){
                            res.status(201).json(token)
                        })
                    })
                }
            })
        })
    }
        
}

module.exports = FbController