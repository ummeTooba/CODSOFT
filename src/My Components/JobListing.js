import React from 'react'

const JobListing = (props) => {
   const {job} = props;
  return (
    <div className='col-md-3'>
        <div className="card my-3" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{job.companyname}</h5>
                <p className="card-text">{job.title}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{job.salaryRange}</li>
                <li className="list-group-item">{job.skills}</li>
                <li className="list-group-item">{job.location} </li>
            </ul>
        </div>

        
        
    </div>
  )
}

export default JobListing
