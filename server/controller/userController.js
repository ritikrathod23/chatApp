const User = require('../model/user-model')
const express = require("express")
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports.getUsers = async (req, res) =>{
    const token = req.cookies.token;
    const loggedInUserId = req.user._id;

    if(!token) return res.status(401).send({message: 'Please authenticate.'})
    try {  
        const Alluser = await User.find({ _id: { $ne: loggedInUserId }}).select("-password")
        
        return res.json(Alluser)
        .status(200)

    } catch (error) {
        console.log(error, "cant fetch user")
        
    }

}


module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email})
        if(!user) return res.status(500).send({massege:"user not found"})
      
        bcrypt.compare(password, user.password , (err, isMatch) => {
            if(isMatch){
                const token = jwt.sign({email: email, userid: User._id}, "shhhh")
                res.cookie("token",token)
                .status(200).send({user:{
                    _id : user.id,
                    name: user.name
                }, massege:"Login Succcessfull"})
                } 
            else return res.status(500).send({massege:"Invalid Password"})
        }) 
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).sent({message: "Internal server error"})
    }
    
}


module.exports.signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({email})
        if(user) return res.status(500).send("user already exist")

        bcrypt.genSalt(10, async (err, salt)=>{
            bcrypt.hash(password, salt, async function(err, hash) {
                const createAccount = await User.create({
                name,
                email,
                password: hash
                })

                const token = jwt.sign({email: email, userid: User._id}, "shhhh")
                res.cookie("token",token)
                .status(200).send({
                    massege: "Account created successfully"
                })
            });
        })
        
    } catch (error) {
        console.log("Error in Signup controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}