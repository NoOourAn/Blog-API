const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const AuthMiddleware = require("../middlewares/auth");

///GET All Comments of Specific post
router.get("/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        const obj = await Post.findOne({ _id: postId }, { comments: 1, _id: 0 });
        await res.json({ success: true, comments: obj.comments });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

////Get Comment with Post Id and Comment Id
router.get("/:postId/comments/:commentId", async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findOne(
            { _id: postId, "comments._id": commentId },  ///this is for matching doc
            { _id: 0, comments: { $elemMatch: { _id: commentId } } } ///this is for projection
        );
        console.log(post)
        const obj = {
            success: true,
            comment: post ? post.comments[0] : "post or comment not found",
        };
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

///////////////////////////////////
// /////Comments CRUD Operations

// /////////////////////////////////////////
// ///CREATE UPDATE DELETE comment /// Needs Authentication ///Use Middleware


////CREATE operation
router.post("/:postId/comments", AuthMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { text } = req.body;
        const user_id = req.decodeData.id;
        if (text) {
            const newComment = { text, user_id }
            const post = await Post.findOneAndUpdate(
                { _id: postId }, ///this is for matching doc
                { $push: { comments: newComment } }
            )

            const obj = {
                success: true,
                message: post ? "comment was created succesfully" : "post not found",
            };
            res.send(obj);
        } else throw new Error("comment text are required");
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ////////UPDATE DELETE operation
// ///MANIPULATE Comment with ID
router.use(AuthMiddleware).route("/:postId/comments/:commentId")
    .delete(async (req, res) => {
        ///delete Comment
        try {
            const { postId, commentId } = req.params;
            const userId = req.decodeData.id;
            const post = await Post.findOneAndUpdate(
                { _id: postId, $or: [{ user_id: userId }, { "comments.user_id": userId }], "comments._id": commentId, }, ///the user owns the post can delete any comment on his post or the user wrote the comment itself
                { $pull: { comments: { _id: commentId } } }, ///this is the update statement
                { returnOriginal: false }
            )

            const obj = {
                success: true,
                message: (post) ? "comment deleted successfully" : "something went wrong!",
                // comments: post.comments
            };

            res.send(obj);
        } catch (err) {
            res.json({ success: false, message: err.message });
        }
    })
    .patch(async (req, res) => {
        ///edit Comment
        try {
            const { postId, commentId } = req.params;
            const { text } = req.body;
            const userId = req.decodeData.id;
            const post = await Post.findOneAndUpdate(
                { _id: postId, "comments.user_id": userId  , "comments._id": commentId, }, ///the user owns the post can NOT update any comment on his post BUT the user wrote the comment itself Can
                { $set: { "comments.$.text" : text } },
                { returnOriginal: false }
            );

            const obj = {
                success: true,
                message: post ? "comment edited successfully" : "something went wrong!",
                // comments: post.comments
            };
            res.send(obj);
        } catch (err) {
            res.json({ success: false, message: err.message });
        }
    });

module.exports = router;
