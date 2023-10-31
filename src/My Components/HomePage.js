import React from 'react'

const HomePage = () => {
  return (
    <>
     <div className=" mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to our Job Portal</h1>
        <p className="lead">Find the best job opportunities here.</p>
        <hr className="my-4" />
        <p>
          Welcome to our job portal where you can explore numerous job opportunities and take your career to new heights.
        </p>
        <a className="btn btn-primary btn-lg" href="/job-listings" role="button">View Job Listed</a>
      </div>
    </div>
    </>
  )
}

export default HomePage
