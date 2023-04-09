const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    caption: {
        type: String
    },

    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    likes: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }
    ],

    comments: [
        {
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String,
            }
        }
    ]


})

module.exports = mongoose.model('Post', postShema)