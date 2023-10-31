import React from 'react'

const LoginE = () => {
  return (
    <div className="container mt-3">
        <h5 className="my-2">Login to continue to Employer Dashboard</h5>
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

  )
}

export default LoginE
