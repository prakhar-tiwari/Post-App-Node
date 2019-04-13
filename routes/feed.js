const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

router.get('/status', isAuth, feedController.getStatus);

router.post('/status', isAuth,
[
 body('status')
 .trim()
 .isLength({min:10})
],
 feedController.updateStatus);

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post('/post', isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], feedController.createPost);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put('/post/:postId', isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
],
    feedController.updatePost);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;