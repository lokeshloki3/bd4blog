const express = require('express');
const router = express.Router();

// import controller
// const { dummyLink} = require('../controllers/likeController');
const { createComment } = require('../controllers/commentController');

// Mapping created
// router.get('/dummyroute', dummyLink);
router.post('/comments/create', createComment);

// export
module.exports = router;