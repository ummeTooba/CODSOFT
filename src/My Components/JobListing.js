import React,{useContext} from 'react'
import Jobcontext from '../context/joblisted/JobContext';


const JobListing = (props) => {
    const context = useContext(Jobcontext);
    const {deleteJob } = context;

    //passing job array from Jobs in form of props
    const {job, updateJob} = props; 

    //   // Log the received job object for debugging
    //   console.log('Received job:', job);

    // For showing skills array with a space and comma
     let skillsString = "";
     if (job.skills) {
        if (Array.isArray(job.skills)) {
            // Join skills array with a space and comma
            skillsString = job.skills.join(', ');
        } else {
            // Convert skills to string representation
            skillsString = job.skills.toString();
        }
    }

    // Function to format the date to 'YYYY-MM-DD' format
    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString(undefined, options);
    //   };
      

      const formatDate = (dateString) => {
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
      
        return `${month} ${day}, ${year}`;
      };
      
  return (
    <>
    <div className='col-md-3'>
        <div className="card my-3" >
            <div className="card-body">
                <div className="d-flex mb-3 align-item-center ">
                    <h5 className="card-title me-auto p-2">{job.companyname}</h5>
                    <i className="fa-solid fa-pen p-2"onClick={()=>{updateJob(job)}}></i>
                    <i className="fa-solid fa-trash p-2" onClick={()=>{deleteJob(job._id)}}></i> 
                    </div>
                    <p className="card-text">{job.title}</p>
                    <p className="card-text">{job.description}</p> 
               </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{job.salaryRange} </li>
                   
                    <li className="list-group-item">{skillsString}</li>
                  
                    <li className="list-group-item">{job.location} </li>
                    <li className="list-group-item"> {formatDate(job.applicationDeadline)} </li>
                </ul>
        </div>
    </div>
    </>
  )
}

export default JobListing
