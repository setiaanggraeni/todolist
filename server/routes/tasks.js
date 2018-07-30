var express = require('express');
var router = express.Router();
const {createTask, editTask, deleteTask} = require('../controllers/taskController')

/* GET users listing. */
router.post('/addtask', createTask);
router.put('/edit/:_id', editTask);
router.delete('/delete/:_id', deleteTask);

module.exports = router;
