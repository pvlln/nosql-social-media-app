const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction.js');
const User = require('./user.js');
const dayjs = require('dayjs');

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dayjs(timestamp).format('MM/DD/YYYY'),
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            // ATM this is the userId. Need to make it username
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: true,
    }
);

// Create and export thought model
const Thought = model('thought', thoughtSchema);
module.exports = Thought;