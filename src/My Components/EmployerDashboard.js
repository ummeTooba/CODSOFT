import React from 'react'
import Jobs from './Jobs'

const EmployerDashboard = () => {
   
    return (
    <div  className='container'>
      <h1>Welcome to  Employer Dashboard</h1>
      {/* <LoginE/> */}
      <div className="container mt-3">
        <h5 className="my-2">Add Job</h5>
        <form>
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email"className="form-control"id="email" name="email" aria-describedby="emailHelp"/>
            
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>

          </div>
          <div className="my-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" name="password"className="form-control"id="password"/>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    <Jobs/>
      
    </div>
  )
}

export default EmployerDashboard
