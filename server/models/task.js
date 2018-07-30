const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const ToDoListSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'Users'},
    task: String,
    createdAt: {type: Date, default: Date.now},
    dueDate: {
        type: Date
    }, 
    status: {
        type: String,
        default: 'uncomplete'
    } 
})

const todolist = mongoose.model('Todolist', ToDoListSchema)

module.exports = todolist