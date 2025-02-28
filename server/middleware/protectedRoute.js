const jwt = require('jsonwebtoken')
const dotenv = require ("dotenv");
dotenv.config();
const User = require('../model/user-model')

const protectedRoute = async (req, res, next) => {
    const token = req.cookies.token 
    // console.log("token", token)
    try {
        
        if (!token) {
            return res.status(401).send({ message: 'You must login first' });
        }
        const data = jwt.verify(token, process.env.SECREATEKEY);
        
        if(!data){
            return res.status(401).json({error: "Unauthorized - Invalid token"})
        }
        
        const user = await User.findOne({email: data.email}).select("-password");
        
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message )
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports  = protectedRoute;