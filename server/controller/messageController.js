const Conversation = require('../model/conversation-model')
const Message = require('../model/message-model');
const { getReceiverSocketId, io } = require('../socket/socket');

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const  {id: receiverId } = req.params;
        const senderId = req.user.id;

        let conversation =  await Conversation.findOne(
            {recipients: {$all: [senderId, receiverId]}}
        );

        if(!conversation){
            conversation = await Conversation.create({recipients: [senderId, receiverId]});

        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        
        if (newMessage) {
            conversation.message.push(newMessage._id);
		}

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)
        
        if(receiverSocketId ){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

const getMessage = async (req, res ) => {
    try {
        const {id: userToChat } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            recipients:{$all: [senderId, userToChat]}
        }).populate("message")

        if(!conversation) return res.status(200).json([])
        
        const message = conversation.message
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = { sendMessage, getMessage };