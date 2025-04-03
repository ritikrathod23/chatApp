const mongoose = require('mongoose')
const dotenv = require ("dotenv");
dotenv.config();

const url = process.env.MONGOOSE_KEY


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