var express = require('express');
var router = express.Router();
const {register, login, userTask, editUser, deleteUser} = require('../controllers/userController')
const {getDataFromFb} = require('../controllers/fbController')
/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.get('/tasks', userTask)
router.put('/edit/:_id', editUser)
router.delete('/delete/:_id', deleteUser)
// router.post('/login/fb', register);
router.get('/login/fb', getDataFromFb);

module.exports = router;
