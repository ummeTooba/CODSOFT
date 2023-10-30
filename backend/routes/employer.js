const express = require('express')
const router = express.Router();
const Employer = require('../models/Employer');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchemployer = require('../middleware/fetchemployer');


//secret for JWT signature
const JWT_SECRET = 'Toobai$@Girlem';

// ROUTE : 1 "Create a employer using: POST "/api/employer/createemployer" Doesn't require login"
router.post('/createemployer',[
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
      let user = await Employer.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({error: "Sorry a employer with this email already exists." });
      }

    //create variable for password by using bcryptjs 
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);

    //Creating employer in database
    employer = await Employer.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
          });
    
    //Signing jwt authentication & getting token on the creation of employer
    const data = {
        employer:{
        id: employer.id
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

// ROUTE : 2 'Authenticate a employer using: POST "/api/employer/loginemployer" Doesn't require login'
router.post('/loginemployer',
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
  //pulling employer fron database
    let user = await Employer.findOne({email});
    if (!user){
      return res.status(400).json({error: "Please enter correct credentials"});
    }

  //Comparing password using bcrypt compare
  const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please enter correct credentials"});
    }

  //if user exist payload the data of that employer!
    const data = {
      employer:{
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

// ROUTE : 3 'Get logedIn user details  using: POST "/api/employer/getemployer"  Require login'
router.post('/getemployer', fetchemployer  ,async (req,res)=>{
    try {

      userId=req.employer.id;
      const user = await Employer.findById(userId).select("-password"); 
      res.send(user);
    }

    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured")
    }
    
    });

module.exports = router