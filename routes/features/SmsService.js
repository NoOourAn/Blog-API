const express = require("express");
const router = express.Router();
const AWS = require('aws-sdk');

router.get('/sendsms', (req, res) => {
    var params = {
        Message: req.query.message,
        PhoneNumber: '+2' + req.query.number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': req.query.subject
            }
        }
    };

    var publishTextPromise = new AWS.SNS({
        accessKeyId: process.env.SNS_ACCESS_KEY,
        secretAccessKey: process.env.SNS_ACCESS_SECRET,
        region:'us-east-1'
    }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

});

module.exports = router