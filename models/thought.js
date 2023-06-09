const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction.js');

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoguhtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: add getter,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: username
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