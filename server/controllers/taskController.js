const Task = require('../models/task')
const User = require('../models/user')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class Todolist {
    static createTask(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({email: decoded.email}, (err, currentUser) => {
                    let id = currentUser[0].id
                    let {task, dueDate} = req.body
                    Task.create({userId:mongoose.Types.ObjectId(id), task, dueDate}, (err, createdTask) => {
                        if(err) return next('Wrong access!')
                        res.status(201).json('Successfully created new task!')
                    })
                }) 
            }) 
        }
    }

    static editTask(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                Task.find({_id : req.params._id}, (err, currentTask) => {
                    let idUser = currentTask[0].userId
                    let {task, dueDate, status} = req.body
                    if(decoded._id == idUser){
                        Task.update({_id : req.params._id}, {$set : {
                            task, dueDate, status
                        }})
                        .exec((err, result) => {
                            if(err) return next('Wrong access!')
                            res.status(201).json(`Successfully update task id ${req.params._id}`)
                        })
                    } else {
                        res.status(403).json('You dont have access to update this task!')
                    }
                })  
            })
        }
    }

    static deleteTask(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                Task.find({_id : req.params._id}, (err, currentTask) => {
                    let idUser = currentTask[0].userId
                    if(decoded._id == idUser){
                        Task.deleteOne({_id : req.params._id}, (err) => {
                            if(err) return next("Delete task failed!")
                            res.status(201).json(`Successfully deleted task id ${req.params._id}`)
                        })
                    } else {
                        res.status(403).json('You dont have access to delete this task!')
                    }
                })  
            })
        }
    }
}

module.exports = Todolist