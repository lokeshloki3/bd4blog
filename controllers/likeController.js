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

        // UPDATE THE POST BASED ON THE LIKE - if without populate then only ids of likes will be fetched
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, {new: true})
                            .populate('likes').exec(); // populate the likes array with the new comment if not then only ids of liked in body

        res.json({
            post: updatedPost,
        });


    } catch (error) {
        return res.status(400).json({
            error: "Error while liking post",
        });
    }
}

// UNLIKING A POST
exports.unlikePost = async (req, res) => {
    try {

        const { post, like } = req.body;
        // find and delete like from COLLECTION OF LIKES
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like});

        // UPDATE THE POST BASED ON THE LIKE
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id} }, {new: true})
                            .populate('likes').exec();

        res.json({
            post: updatedPost,
        });


    } catch (error) {
        return res.status(400).json({
            error: "Error while unliking post",
        });
    }
}

exports.dummyLink = (req, res) => {
    res.send('Dummy Link');
};