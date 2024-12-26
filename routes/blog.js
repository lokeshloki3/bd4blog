const express = require('express');
const router = express.Router();

// import controller
const { dummyLink} = require('../controllers/likeController');
const { createComment } = require('../controllers/commentController');
const { createPost } = require('../controllers/postController');

// Mapping created
router.get('/dummyroute', dummyLink);
router.post('/comments/create', createComment);
router.post('/posts/create', createPost);

// export
module.exports = router;