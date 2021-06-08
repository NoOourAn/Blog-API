const express = require("express");
const router = express.Router();
var Recaptcha = require('express-recaptcha').RecaptchaV3;

var recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);


router.post("/verifyRecaptcha", recaptcha.middleware.verify, async (req, res) => {
    if (!req.recaptcha.error) {
        res.json({ success: true, message: "ReCaptcha Passed" });
    } else {
        res.json({ success: false, message: "Captcha could not be verified. Please try again." });
    }
});

module.exports = router;
