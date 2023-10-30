var jwt = require('jsonwebtoken');
//secret for JWT signature
const JWT_SECRET = 'Toobai$@Girl';

     //Get the candidate from the JWT token and add id to req object
const fetchcandidate = (req,res,next) =>{
   
    //Get token from header of request
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "PLease authenticate by using token" });
    }

    try {
    //fetching data from token 
    const data = jwt.verify(token, JWT_SECRET);
    req.candidate = data.candidate;

    next()
    } 
    catch (error) {
        res.status(401).send({ error: "PLease authenticate by using a valid token" });
    }
    
}

module.exports = fetchcandidate;