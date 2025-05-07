const multer = require('multer');


// Set up storage for uploaded files
const storage = multer.memoryStorage();

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;