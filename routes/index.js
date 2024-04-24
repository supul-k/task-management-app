const express = require('express');
const router = express.Router();

const TaskRoutes = require('./task.routes');
const AuthRoutes = require('./auth.routes');

router.use('/tasks', TaskRoutes);
router.use('/auth', AuthRoutes);

module.exports = router;