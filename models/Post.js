const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        user_id: {
            index: true,
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            maxlength: 200,
            required: [true, "can't be blank"],
        },
        body: {
            type: String,
            maxlength: 2000,
            required: [true, "can't be blank"],
        },
        imgUrl: { type: String },
        comments: [
            {
                user_id: {
                    index: true,
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                text: {
                    type: String,
                    min: 1,
                    maxlength: 500,
                    required: [true, "can't be blank"],
                },
                time: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
