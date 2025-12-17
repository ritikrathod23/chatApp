const User = require('../model/user-model')
const express = require("express")
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer')

module.exports.getUsers = async (req, res) =>{
    const token = req.cookies.token;
    const loggedInUserId = req.user._id;

    if(!token) return res.status(401).json({message: 'Please authenticate.'})
    try {  
        const Alluser = await User.find({ _id: { $ne: loggedInUserId }}).select("-password")
        
        return res.json(Alluser)
        .status(200)

    } catch (error) {
        console.log(error, "cant fetch user")
        
    }

}


module.exports.profile = async (req, res) =>{
    const userId  = req.params.id;
    
    
    try {
        const name = req.body.name;
        console.log("req", req.body)
        const base64 = req.file.buffer.toString('base64');

        updateProfile = await User.findByIdAndUpdate(
            userId,
            {   name: name,
                profile: base64
            },
            {new: true} 
        )


        if(!updateProfile){
            return res.status(404).json({message: "user not found"})
        }

        res.status(200).json({
            message: 'Profile updated successfully.',
            profile: updateProfile.profile,
        })

    } catch (error) {
        res.status(500)
        .json({
            message: 'Error updating profile.',
            error: error.message 
        });
    }

}




module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email})
        if(!user) return res.status(500).json({message:"user not found"})
      
        bcrypt.compare(password, user.password , (err, isMatch) => {
            if(isMatch){
                const token = jwt.sign({email: email, userid: User._id}, process.env.SECRET_KEY)
                res.cookie("token",token)
                .status(200).json({user:{
                    _id : user.id,
                    name: user.name,
                    profile: user.profile
                }, message:"Login Successfully"})
                } 
            else return res.status(500).json({message:"Invalid Password"})
        }) 
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({message: "Internal server error"})
    }
    
}


module.exports.signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({email})
        if(user) return res.status(500).json("user already exist")

        bcrypt.genSalt(10, async (err, salt)=>{
            bcrypt.hash(password, salt, async function(err, hash) {
                const createAccount = await User.create({
                name,
                email,
                password: hash,
                profile: null
                })

                const token = jwt.sign({email: email, userid: User._id}, process.env.SECRET_KEY)
                res.cookie("token",token)
                .status(200).json({
                    message: "Account created successfully"
                })
            });
        })
        
    } catch (error) {
        console.log("Error in Signup controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}