const jwt = require('jsonwebtoken') ; //importing express libraries

async function verifyToken (req,res,next) {

    const authHeader = req.headers['authorization'] ; //gets headers from request

    if(!authHeader){
        return res.send(400).json({erorr : 'no token provided'});
    }; //checks if function got headers already or not

    const userToken = authHeader.split(' ')[1]; // splits headers to get cookies
    
    try {
        
        const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY); //verifies cookie
        req.user = verifyToken; //sets req.user value to veriftToken so we can reuse it 

        next(); //triggers next function after this middleware finishes his logic

    }catch(err){
        
        return res.status(401).json({error: 'Invalid Token'}); //returns 401 status error code if cookies are not provided

    };

};

module.exports = verifyToken; //exporting middleware