const express = require("express")
const router = express.Router();
const { getUsers, login, signup } = require("../controller/userController");
const protectedRoute = require("../middleware/protectedRoute");

router.get('/getusers', protectedRoute, getUsers)

//signup or register router
router.post('/signup', signup)

//Login router
router.post('/login', login)

//Logout router
router.post('/logout', async (req, res) => {
    res.clearCookie("token")
    .status(200)
    .send({message: "logout successfull"}) 
})


module.exports = router