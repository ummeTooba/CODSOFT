const express = require('express');
const fetchemployer = require('../middleware/fetchemployer');
const router = express.Router();
const Ejob = require('../models/Ejob');
const Employer = require('../models/Employer');
const { body,validationResult } = require('express-validator');

// ROUTE : 1 "Get all the jobs using: GET "/api/ejob/getallejobs"  Require login"
router.get('/getallejobs',fetchemployer,async (req,res)=>{
    try {
    const jobs = await Ejob.find({employer: req.employer.id});
    res.json(jobs)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")  
    }
});

// ROUTE : 2 "Adding jobs using: POST "/api/ejob/addjobs"  Require login"
router.post('/addjobs',fetchemployer,
[   body("title", "Enter a valid name").isLength({ min: 5 }),
    body("companyname", "Enter a valid Company name").isLength({ min: 3 }),
    body("description", "Description is too short").isLength({ min: 10 }),
    body("skills").isArray().withMessage('Skills should be an array'),
    body("location","Enter a valid location").isString(),
    body("salaryRange","Enter a valid salary range").isString(),
    body('applicationDeadline', 'Enter a valid date').isISO8601()

],
async (req,res)=>{
    try {
    //fetching data from request body for creating new job
    const {title,companyname,description,skills,location,salaryRange,applicationDeadline} = req.body;

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = new Ejob({
        title,companyname,description,skills,location,salaryRange,applicationDeadline, employer: req.employer.id
    })

    const savedJob = await job.save()
    res.json(savedJob)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// ROUTE : 3 "Updating an existing job using: PUT "/api/ejob/updatejob"  Require login"
router.put('/updatejob/:id',fetchemployer,async (req,res)=>{
    try {
    //fetching data from request body for creating new job
    const {title,companyname,description,skills,location,salaryRange,applicationDeadline} = req.body;
    //create a newJob object as updated object 
    const newJob = {};
    if(title){newJob.title = title};
    if(companyname){newJob.companyname = companyname};
    if(description){newJob.description = description};
    if(skills){newJob.skills = skills};
    if(location){newJob.location = location};
    if(salaryRange){newJob.salaryRange = salaryRange};
    if(applicationDeadline){newJob.applicationDeadline = applicationDeadline};
    
    //Either who is updating job is related to employer's added job and update it.  
    let job = await Ejob.findById(req.params.id);
    if(!job){return res.status(404).send("Not Found")}

    if(job.employer.toString() !== req.employer.id){
        return res.status(401).send("Not Allowed");
    }
    //if job exist 
    job = await Ejob.findByIdAndUpdate(req.params.id, {$set: newJob}, {new:true});
    res.json({job})
}
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// ROUTE : 3 "Deleting an existing job using: DELETE "/api/ejob/deletejob"  Require login"
router.delete('/deletejob/:id',fetchemployer,async (req,res)=>{
    try {
    // Fetch the job by ID
    let job = await Ejob.findById(req.params.id);
    
    // Check if the job exists
    if(!job){return res.status(404).send("Not Found")}
    
    // Check if the job is owned by the authenticated employer
    if(job.employer.toString() !== req.employer.id){
        return res.status(401).send("Not Allowed");
    }
    // Capture the ID before deletion
     const deletedJobId = job._id; 

    //if job exist delete the job 
    job = await Ejob.findByIdAndDelete(req.params.id);

    // Respond with the deleted job's ID
    res.json({"Success": "Job has been deleted", deletedJobId: deletedJobId});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
})
module.exports = router