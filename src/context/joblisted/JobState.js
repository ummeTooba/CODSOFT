import React, { useState } from "react";
import Jobcontext from "./JobContext";

const JobState = (props) => {
  const host = "http://localhost:5000"
  const jobsInitial = []
  const [jobs, setJobs] = useState(jobsInitial);
 
  //------------Get all jobs
  const getJobs =async()=>{
    //API Network call to database 
    const response = await fetch(`${host}/api/ejob/getallejobs`, 
    {
     method: "GET", 
     headers: {
       "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llciI6eyJpZCI6IjY1M2VjNTBiMWQ1YTMzNmUwMjhkYjYwZSJ9LCJpYXQiOjE2OTg2MTI0OTF9.8gPvWzCvpSqwZnAEt1xhKEqXdd75wbCV2z-7HvACa7c"
      }
   });
     const json = await response.json();
      console.log(json)
      setJobs(json) 
   }
     
  //==============================ADD JOB
  const addJob = async (title,companyname,description,skills,location,salaryRange,applicationDeadline) => {
    //API Network call to database 
    const response = await fetch(`${host}/api/ejob/addjobs`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llciI6eyJpZCI6IjY1M2VjNTBiMWQ1YTMzNmUwMjhkYjYwZSJ9LCJpYXQiOjE2OTg2MTI0OTF9.8gPvWzCvpSqwZnAEt1xhKEqXdd75wbCV2z-7HvACa7c"
      },
    // body data type must match "Content-Type" header
      body: JSON.stringify({title,companyname,description,skills,location,salaryRange,applicationDeadline}), 
    });

    console.log("Adding a new Job!")
    
    //Adding note logic to client
    const job= await response.json()
    setJobs(jobs.concat(job));
    };

  //======================EDIT JOB 
  const editJob = async (id,title,companyname,description,skills,location,salaryRange,applicationDeadline) => {
    //API Network call to database todo
    if (id) {
    const response = await fetch(`${host}/api/ejob/updatejob/${id}`, 
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llciI6eyJpZCI6IjY1M2VjNTBiMWQ1YTMzNmUwMjhkYjYwZSJ9LCJpYXQiOjE2OTg2MTI0OTF9.8gPvWzCvpSqwZnAEt1xhKEqXdd75wbCV2z-7HvACa7c"
      },
    // body data type must match "Content-Type" header
      body: JSON.stringify({title,companyname,description,skills,location,salaryRange,applicationDeadline}), 
    });
    // parses JSON response into native JavaScript objects
    const json =  response.json(); 
    console.log(json)
    
    let newJob = await JSON.parse(JSON.stringify(jobs))
    //Logic to Edit job in client site
    for (let index = 0; index < jobs.length; index++) {
      const element = newJob[index];
      if (element._id === id){
        element.title = title;
        element.companyname = companyname;
        element.description = description;
        element.skills = skills;
        element.location = location;
        element.salaryRange = salaryRange;
        element.applicationDeadline = applicationDeadline;
        break;
      }}
      console.log(id,newJob)
      setJobs(newJob);
    }
  
  else {
    console.error("Undefined _id");
  }
}  
  //========================Delete job
  const deleteJob = async (_id) => {
    const response = await fetch(`${host}/api/ejob/deletejob/${_id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llciI6eyJpZCI6IjY1M2VjNTBiMWQ1YTMzNmUwMjhkYjYwZSJ9LCJpYXQiOjE2OTg2MTI0OTF9.8gPvWzCvpSqwZnAEt1xhKEqXdd75wbCV2z-7HvACa7c"
       }
    })
    const json = response.json();
    console.log(json)
  //Logic to delete in client site
    console.log("Deleting Job with this ID"+_id)
    const newJobs= jobs.filter((job)=>{return job._id !== _id})

    setJobs(newJobs)
    };

  return (
    <Jobcontext.Provider value={{ jobs, setJobs, getJobs, addJob, editJob, deleteJob }}>
      {props.children}
    </Jobcontext.Provider>
  );
};
export default JobState;
