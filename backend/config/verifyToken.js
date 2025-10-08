const jwt = require('jsonwebtoken')

async function verifyToken (req,res,next) {

    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.send(400).json({erorr : 'no token provided'})
    }

    const userToken = authHeader.split(' ')[1]
    
    try {
        
        const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY)
        req.user = verifyToken

        next()

    }catch(err){
        
        return res.status(401).json({error: 'Invalid Token'})

    }


}

module.exports = verifyToken