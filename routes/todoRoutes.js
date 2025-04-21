const express = require('express');
const router = express.Router();
const { getTodos, addTodo } = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', addTodo);

module.exports = router;