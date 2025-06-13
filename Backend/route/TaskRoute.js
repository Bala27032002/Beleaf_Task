const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/fetch-posts', TaskController.fetchAndSavePosts);
router.get('/', TaskController.getAllPosts);
router.put('/:id', TaskController.updatePost);
router.delete('/:id', TaskController.deletePost);

module.exports = router;
