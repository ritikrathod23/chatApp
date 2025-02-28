const mongoose = require('mongoose');

const { Schema } = mongoose;
const cosnversationModel = new Schema({
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    message: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }]
    },
    {timestamps: true}
);



const Conversation = mongoose.model('Conversation', cosnversationModel)

module.exports = Conversation;
 
