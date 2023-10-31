import React , {useContext} from 'react'
import Jobcontext from '../context/joblisted/JobContext';
import JobListing from './JobListing';


const Jobs = () => {
    const context = useContext(Jobcontext);
    const {jobs, setJobs } = context;
  return (
    <div className='row my-3'>
    <h3>Job Listed</h3>
    {jobs.map((job)=>{
        return <JobListing job={job}/>
    })}
    </div>
  )
}

export default Jobs
