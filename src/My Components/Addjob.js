import React , {useContext,useState,useEffect} from 'react'
import Jobcontext from '../context/joblisted/JobContext';

const Addjob = () => {
    const context = useContext(Jobcontext);
    const {addJob } = context;
    //declaring usestate for onchange function
    const [job, setjob] = useState({title:"",companyname:"",description:"",skills:"",location:"",salaryRange:"",applicationDeadline:""});

    // Convert ISO string to Date object for input field value
    useEffect(() => {
      if (job.applicationDeadline) {
        const date = new Date(job.applicationDeadline);
        const formattedDate = date.toISOString().split('T')[0]; // Convert to "YYYY-MM-DD" format
        setjob(jab=>({ ...jab, applicationDeadline: formattedDate }));
      }
    }, [job.applicationDeadline]);
    
    const onChange = (e) => {
        if (e.target.name === 'skills') {
            // Split the entered string of skills into an array separated by commas
            setjob(jab=>({ ...jab, [e.target.name]: e.target.value.split(',').map(skill => skill.trim()) }));
        }
         else if(e.target.name === "applicationDeadline") {
          const date = new Date(e.target.value);
          const isoDateString = date.toISOString(); // Convert back to ISO string
          setjob(jab=>({ ...jab, applicationDeadline: isoDateString }));
        } 
        else {
            setjob(j=>({ ...j, [e.target.name]: e.target.value }));
        }
    }

    const handleOnclick =(e)=>{
        e.preventDefault();
        addJob(job.title,job.companyname,job.description,job.skills,job.location,job.salaryRange,job.applicationDeadline);
    }
  return (

    <div className="container mt-3">
        <h5 className="my-2">Add Job</h5>
        <form>

          <div className="my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text"className="form-control"id="title" name="title" onChange={onChange} required aria-describedby="emailHelp"/>
          </div>
          <div className="my-3">
            <label htmlFor="companyname" className="form-label">Company Name</label>
            <input type="text"className="form-control"id="companyname" name="companyname" onChange={onChange} required aria-describedby="emailHelp"/>
          </div> 
           <div className="my-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text"className="form-control"id="description" name="description" onChange={onChange} required aria-describedby="emailHelp"/>
          </div>  
          <div className="my-3">
            <label htmlFor="skills" className="form-label">Skills</label>
            <input type="text"className="form-control"id="skills" name="skills" onChange={onChange} required aria-describedby="emailHelp"/>
          </div>
          <div className="my-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text"className="form-control"id="location" name="location"onChange={onChange}required aria-describedby="emailHelp"/>
          </div>
          <div className="my-3">
            <label htmlFor="salaryRange" className="form-label">Salary Range</label>
            <input type="text"className="form-control"id="salaryRange" name="salaryRange" onChange={onChange} required aria-describedby="emailHelp"/>
          </div>
          <div className="my-3">
            <label htmlFor="applicationDeadline" className="form-label">Application Deadline</label>
            <input type="date" name="applicationDeadline"className="form-control"id="applicationDeadline" required onChange={onChange}/>
          </div>

          <button type="submit" onClick={handleOnclick} className="btn btn-primary"> Add Job</button>
        </form>
      </div>
  )
}

export default Addjob
