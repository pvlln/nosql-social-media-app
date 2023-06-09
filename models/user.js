const {Schema, model } = require('mongoose');

// Schema that creates user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                // email validation
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thoughts,
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: User,
                // Check self-reference
            },
        ],
    },
    {
        toJSON: {
            getters: true
        },
        id: true,
    },
);

// Create and export user model
const User = model('user', userSchema );
module.exports = User;