const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async (req, res) => {
    try {

        const { post, user } = req.body;
        const like = new Like({
            post,
            user,
        });

        const savedLike = await like.save();

        // UPDATE THE POST BASED ON THE LIKE
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, {new: true})
                            .populate('likes').exec(); // populate the comments array with the new comment if not then only ids of liked in body

        res.json({
            post: updatedPost,
        });


    } catch (error) {
        return res.status(400).json({
            error: "Error while liking post",
        });
    }
}


exports.dummyLink = (req, res) => {
    res.send('Dummy Link');
};