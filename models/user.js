const {Schema, model } = require('mongoose');
const Thought = require('./thought.js');

const validateEmail = function (email){
    let search = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return search.test(email);
};
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
            validate: [validateEmail, "Invalid email."],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                // Check self-reference- 'User'? or this
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