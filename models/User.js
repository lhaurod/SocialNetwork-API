// Require Mongoose
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // use regex to validate correct email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    // subdocuments for thoughts
    thoughts: [{
        type: Schema.Types.ObjectId,
        // referring to the thought document model
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        // referring to the user document model
        ref: 'User'
    }
    ]
},
    {
        toJSON: {
            virtuals: true
            // getters: true
        },
        id: false
    });

// virtual to count friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the User Schema

const User = model('User', UserSchema);

// export user module
module.exports = User;

