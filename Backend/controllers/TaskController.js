const axios = require('axios');
const Post = require('../models/TaskModel');

exports.fetchAndSavePosts = async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    await Post.deleteMany({});
    await Post.insertMany(posts);

    res.status(200).json({ message: 'Posts saved to MongoDB', count: posts.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch/save posts' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};


exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
