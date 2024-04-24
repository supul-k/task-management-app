const express = require('express')
const router = express.Router();
const TaskController = require('../controllers/task.controller')
const jwtUtils = require('../utils/jwtUtils')

router.post('/', jwtUtils.verifyToken,TaskController.createTask);
router.get('/',  jwtUtils.verifyToken, TaskController.getTasks);
router.get('/:id', jwtUtils.verifyToken, TaskController.getTaskById);
router.put('/:id', jwtUtils.verifyToken, TaskController.updateTask);
router.delete('/:id', jwtUtils.verifyToken, TaskController.deleteTask);

module.exports = router;