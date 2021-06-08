const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/ImgUpload");


router.post("/uploadImage", AuthMiddleware, upload.single('file'), async (req, res) => {
    try {       
        const obj = {
            success: true,
            imgUrl: process.env.BUCKET_URL + req.file.key,
        };
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

module.exports = router;
