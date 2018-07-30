const User = require('../models/user')
const Task = require('../models/task')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const saltRounds = 5;
var salt = bcrypt.genSaltSync(saltRounds);

class Users {
    static register(req, res, next){
        var hash = bcrypt.hashSync(req.body.password, salt);
        var {name, email} = req.body
        var password = hash
        User.findOne({email:email})
        .then(user => {
            if(!user){
                User.create({name, email, password}, (err, newUser) => {
                    if(err) return next(err)
                    res.status(201).json(newUser)
                })
            } else {
                res.json('Email already registered!')
            }
        })
        
    }

    static login(req, res, next){
       var {email, password} = req.body
        User.findOne({email : email})
        .then(user =>{
            if(user !== null){
                let compare = bcrypt.compareSync(password, user.password)
                if(compare){
                    jwt.sign({_id:user._id, email:user.email}, process.env.secretKey, function(err, token){
                        res.status(201).json({name: user.name, token: token})
                    })
                } else{
                    res.json('Wrong email/password!')
                }
            } else {
                console.log('Email not found, please kindly for register!')
            }
            
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
    }

    static userTask(req, res, next){
        let userTasks = []
        let token = req.headers.token
        if(!token){
            res.json('Login to view your profile!')
        } else {
            jwt.verify(req.headers.token, process.env.secretKey, function(err, decoded){
                let email = decoded.email
                Task.find({})
                .populate('userId')
                .exec((err, dataTask) => {
                    if(err) res.status(404).json('Task empty!')
                    dataTask.forEach(taskPerUser => {
                        if(taskPerUser.userId.email === email){
                            // console.log("=========== task user",taskPerUser)
                            userTasks.push({user:taskPerUser.userId._id, taskId: taskPerUser._id ,task: taskPerUser.task, start: String(taskPerUser.createdAt).slice(0,15), dueDate: String(taskPerUser.dueDate).slice(0,15), status: taskPerUser.status})
                        }
                    })
                    res.json(userTasks)
                })
            })
        }  
    }

    static editUser(req, res, next){
        let token = req.headers.token
        if(!token){
            res.json('Login to update your profile!')
        } else {
            jwt.verify(req.headers.token, process.env.secretKey, function(err, decoded){
                let id = decoded._id
                // console.log("=====",decoded._id)
                if(id == req.params._id){
                    let hash = bcrypt.hashSync(req.body.password, salt);
                    let {name, email} = req.body
                    let password = hash
                    User.update({_id : req.params._id}, {$set : {
                        name, email, password
                    }})
                    .exec((err, result) => {
                        if(err) return next(err)
                        res.status(201).json(`Sucessfully update user id ${req.params._id}`)
                    })
                } else {
                    res.status(403).json('You dont have access to edit this user!')
                }
            })
        }
    }

    static deleteUser(req, res, next){
        let token = req.headers.token
        if(!token){
            res.json('Login to update your profile!')
        } else {
            jwt.verify(req.headers.token, process.env.secretKey, function(err, decoded){
                let id = decoded._id
                if(id == req.params._id){
                    User.deleteOne({_id : req.params._id}, (err) => {
                        if(err) return next(err)
                        res.status(201).json(`Successfully deleted user id ${req.params._id}`)
                    })
                } else {
                    res.status(403).json('You dont have access to edit this user!')
                }
            })
        }       
    }

}

module.exports = Users
