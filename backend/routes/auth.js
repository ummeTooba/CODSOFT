const express = require('express')
const router = express.Router();
const Candidate = require('../models/Candidate');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchcandidate = require('../middleware/fetchcandidate');


//secret for JWT signature
const JWT_SECRET = 'Toobai$@Girl';

// ROUTE : 1 "Create a candidate using: POST "/api/auth/createcandidate" Doesn't require login"
router.post('/createcandidate',[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length should contain 8").isLength({ min: 8 }),],
    
    async (req,res)=>{

    //if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

     try {
    //check whether the user with the email exist already
      let user = await Candidate.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({error: "Sorry a candidate with this email already exists." });
      }

    //create variable for password by using bcryptjs 
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);

    //Creating candidate in database
        candidate = await Candidate.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
          });
    
    //Signing jwt authentication & getting token on the creation of candidate
    const data = {
      candidate:{
        id: candidate.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);

    res.json({authtoken});
    } 

    catch (error) {
           console.error(error.message);
           res.status(500).send("Some error occured!")
    }
});

// ROUTE : 2 'Authenticate a candidate using: POST "/api/auth/logincandidate" Doesn't require login'
router.post('/logincandidate',
[ body("email", "Enter a valid email").isEmail(),
  body("password", "Password shouldn't be blank").exists()],
  
  async (req,res)=>{
  //if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

//destructuring and take email & password from body
  const {email,password} = req.body;
  
  try {
  //pulling candidate fron database
    let user = await Candidate.findOne({email});
    if (!user){
      return res.status(400).json({error: "Please enter correct credentials"});
    }

  //Comparing password using bcrypt compare
  const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please enter correct credentials"});
    }

  //if user exist payload the data of that candidate!
    const data = {
      candidate:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({authtoken});
  
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured")
  }
});
// ROUTE : 3 'Get logedIn user details  using: POST "/api/auth/getcandidate"  Require login'
    router.post('/getcandidate', fetchcandidate  ,async (req,res)=>{
      try {

        userId=req.candidate.id;
        const user = await Candidate.findById(userId).select("-password"); 
        res.send(user);
      }

      catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
      }
      
      });

module.exports = router