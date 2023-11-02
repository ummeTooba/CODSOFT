import React , {useContext,useEffect, useRef , useState} from 'react'
import Jobcontext from '../context/joblisted/JobContext';
import JobListing from './JobListing';
import Addjob from './Addjob';


const Jobs = () => {
    const context = useContext(Jobcontext);
    const {jobs ,getJobs,editJob} = context;
    
    //Displaying all jobs here
    useEffect(() => {
      getJobs();
      // eslint-disable-next-line
    }, []);
    
    const ref= useRef(null)
    const refClose = useRef(null)
    const [job, setjob] = useState({id:"", etitle:"",ecompanyname:"",edescription:"",eskills:"",elocation:"",esalaryRange:"",eapplicationDeadline:""});


    const updateJob=(currentJob)=>{
     ref.current.click();
     setjob({id: currentJob._id, etitle: currentJob.title,ecompanyname: currentJob.companyname,edescription: currentJob.description,eskills: currentJob.skills,elocation: currentJob.location,esalaryRange: currentJob.salaryRange,eapplicationDeadline: currentJob.applicationDeadline})
    }

    // Convert ISO string to Date object for input field value
        useEffect(() => {
          if (job.eapplicationDeadline) {
            const date = new Date(job.eapplicationDeadline);
            const formattedDate = date.toISOString().split('T')[0];
            setjob(prevJob => ({ ...prevJob, eapplicationDeadline: formattedDate }));
          }
        }, [job.eapplicationDeadline]);
    
    const onChange = (e) => {
        if (e.target.name === 'eskills') {
            // Split the entered string of skills into an array separated by commas
            setjob(prevJob => ({ ...prevJob, [e.target.name]: e.target.value.split(',').map(skill => skill.trim()) }));
              } else if (e.target.name === 'eapplicationDeadline') {
                const date = new Date(e.target.value);
                const isoDateString = date.toISOString();
                setjob(prevJob => ({ ...prevJob, eapplicationDeadline: isoDateString }));
              } else {
                setjob(prevJob =>({ ...prevJob, [e.target.name]: e.target.value }));
                    }
                }

    const handleOnEdit =()=>{
      console.log("Editing this Job",job)

      const date = new Date(job.eapplicationDeadline);
      const isoDateString = date.toISOString();
      setjob(prevJob => ({ ...prevJob, eapplicationDeadline: isoDateString }));
        
      editJob(job.id, job.etitle, job.ecompanyname, job.edescription, job.eskills, job.elocation, job.esalaryRange, isoDateString);
      refClose.current.click();
       
      }
  return ( 
    <>
    <Addjob/>
    <div>
  
  <button type="button"  className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
 
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Job</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
       
            <div className="my-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text"className="form-control"id="etitle" name="etitle" onChange={onChange} value={job.etitle}   aria-describedby="emailHelp"/>
            </div>
            <div className="my-3">
              <label htmlFor="companyname" className="form-label">Company Name</label>
              <input type="text"className="form-control"id="ecompanyname" name="ecompanyname" onChange={onChange}value={job.ecompanyname}  aria-describedby="emailHelp"/>
            </div> 
            <div className="my-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text"className="form-control"id="edescription" name="edescription" onChange={onChange} value={job.edescription}   aria-describedby="emailHelp"/>
            </div>  
            <div className="my-3">
              <label htmlFor="skills" className="form-label">Skills</label>
              <input type="text"className="form-control"id="eskills" name="eskills" onChange={onChange} value={job.eskills}   aria-describedby="emailHelp"/>
            </div>
            <div className="my-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input type="text"className="form-control"id="elocation" name="elocation"onChange={onChange}  value={job.elocation}   aria-describedby="emailHelp"/>
            </div>
            <div className="my-3">
              <label htmlFor="salaryRange" className="form-label">Salary Range</label>
              <input type="text"className="form-control"id="esalaryRange" name="esalaryRange" onChange={onChange} value={job.esalaryRange}   aria-describedby="emailHelp"/>
            </div>
            <div className="my-3">
              <label htmlFor="applicationDeadline" className="form-label">Application Deadline</label>
              <input type="date" name="eapplicationDeadline"className="form-control"id="eapplicationDeadline" value={job.eapplicationDeadline}   onChange={onChange}/>
            </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary"ref={refClose} data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={handleOnEdit}>Edit Job</button>
        </div>
      </div>
    </div>
  </div>
</div>

    <div className='row my-3'>
    <h3>Job Listed</h3>
    {jobs.map((job)=>{
        return <JobListing key={job._id} job={job} updateJob={updateJob}/>
    })}
    </div>
    </>
  )
}

export default Jobs
