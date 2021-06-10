const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const User = require("../models/User");


router.get("/activateAccount/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const decodeData = await jwt.verify(token, process.env.Email_SECRETKEY);
        await User.findOneAndUpdate(
            { _id: decodeData.id },
            { activated: true }
        );
        const obj = {
            success: true,
            message: "Account activated successfully",
        };
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

module.exports = router;
