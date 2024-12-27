// IMPORT MODELS
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// BUSINESS LOGIC
exports.createComment = async (req, res) => {
  try {
    // Fetch data from request body - post is id here which is written in request body itself - using express.json middleware
    const { post, user, body } = req.body;

    //Create a comment object
    const comment = new Comment({ post, user, body });

    // Save the new comment into the database
    const savedComment = await comment.save();

    // Find the post by its ID and create a new comment and new for return new comment not old
    const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true} )
                        .populate('comments') // populate the comments array with the new comment
                        .exec();

    res.json({
        post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while saving comment",
    });
  }
};
