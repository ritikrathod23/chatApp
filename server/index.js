const express = require('express');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const { server, app } = require('./socket/socket'); // Correct path to socket.js
const mongooseConnect = require('./config/mongoose-connect');
const cors = require('cors')


const path = require('path')

// Middleware setup
const corsOption = {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }

app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route setup
app.use('/user', userRoute);
app.use('/msg', messageRoute);

const dirname = path.resolve()
app.use(express.static(path.join(dirname, '/client/build')))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(dirname, "client", "build", "index.html"))
})
// Connect to database
mongooseConnect();

// Start server
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server started on port ${port}`));
