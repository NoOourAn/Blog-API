const express = require("express");
const router = express.Router();
var Recaptcha = require('express-recaptcha').RecaptchaV3;

var recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);

router.get("/sendCaptcha", recaptcha.middleware.render, async (req, res) => {
    try {
        ////res.recaptcha filled with captcha from middleware
        res.json({ success: true, captcha: res.recaptcha });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }

});

router.post("/verifyCaptcha", recaptcha.middleware.verify, async (req, res) => {
    try {
        if (!req.recaptcha.error) res.json({ success: true, message: "ReCaptcha Passed" });
        else throw new Error("Captcha could not be verified. Please try again.");
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

module.exports = router;
