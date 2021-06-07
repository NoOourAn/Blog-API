var multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


//// AWS config
const ID = process.env.S3_ACCESS_KEY;
const SECRET = process.env.S3_ACCESS_SECRET;

// The name of the bucket that i have created on AWS
const BUCKET_NAME = 'nour-blog';

// initialize the S3 interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

///// to upload to AWS S3 
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            const key = 'image-' + Date.now() + '.' + filetype;
            cb(null, key);
        }
    }),
});

module.exports = upload;
