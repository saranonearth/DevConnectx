const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   Post api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = {
        text: req.body.text,
        user: req.user.id,
        avatar: user.avatar,
        name: user.name
      };

      const post = await new Post(newPost);

      post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) return res.json({ msg: 'No posts' });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'No post found' });
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'No post found' });
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: 'No post found' });
    //Checking the user
    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'No post found' });
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put('/like.:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has been already been liked

    if (
      post.like.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'No post found' });
    res.status(500).send('Server Error');
  }
});
module.exports = router;
