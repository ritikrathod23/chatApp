const mongoose = require('mongoose')
const dotenv = require ("dotenv");
dotenv.config();

const   url = 'mongodb+srv://ritikrathod9708:xfC4Npx7VS8tF1Ng@cluster0.qbtib.mongodb.net/LCChatApp?retryWrites=true&w=majority&appName=Cluster0'


const mongooseConnect = () =>{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.error(error, "can not connect to mongoose")
        );

}

module.exports = mongooseConnect;