const express = require("express")
const router = express.Router();
const { getUsers, login, signup, profile } = require("../controller/userController");
const protectedRoute = require("../middleware/protectedRoute");
const upload = require("../middleware/profile-image")

router.get('/getusers', protectedRoute, getUsers)

//signup or register router
router.post('/signup', signup)

//Login router
router.post('/login', login)

//Logout router
router.post('/logout', async (req, res) => {
    res.clearCookie("token")
    .status(200)
    .json({message: "logout successfully"}) 
})


router.post('/profile/:id',upload.single('file'), profile)




module.exports = router