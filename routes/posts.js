const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const AuthMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/ImgUpload");

///GET All Posts operation
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        await res.json({ success: true, posts: posts });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

////Get Post with Post ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id });

        const obj = {
            success: true,
            post: post ? post : "post not found",
        };
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

/////////////////////////////////////////
///CREATE UPDATE DELETE post /// Needs Authentication ///Use Middleware
////CREATE operation
router.post("/", upload.single('file'), AuthMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;
        req.body.user_id = req.decodeData.id;
        // if (title && body) {
        if (req.file) req.body.imgUrl = req.file.location;
        req.body.title = "boom"
        req.body.body = "boom"
        await Post.create(req.body);
        const obj = {
            success: true,
            message: "post was created succesfully",
        };
        res.send(obj);
        // } else throw new Error("title and body are required");
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

///MANIPULATE post with ID
//////////////////////
////////DELETE operation
router.delete("/:id", AuthMiddleware, async (req, res) => {
    ///delete POST
    try {
        const { id } = req.params;
        const userId = req.decodeData.id;
        const post = await Post.findOneAndDelete({ _id: id, user_id: userId });
        const obj = {
            success: true,
            message: (post) ? "post deleted successfully" : "post not found",
        };

        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
})

///////////////
////////UPDATE operation
router.patch("/:id", upload.single('file'), AuthMiddleware, async (req, res) => {
    ///edit POST
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        req.body.user_id = req.decodeData.id;
        // if (title && body) {
        if (req.file) req.body.imgUrl = req.file.location;
        req.body.title = "boomtaaaaa5"
        req.body.body = "boomtaaaa5"
        const post = await Post.findOneAndUpdate(
            { _id: id, user_id: req.body.user_id }, req.body, { returnOriginal: false }
        );
        const obj = {
            success: true,
            message: post ? "post edited successfully" : "post not found",
            post,
        };
        res.send(obj);

        // } else throw new Error("title and body are required");
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});


module.exports = router;