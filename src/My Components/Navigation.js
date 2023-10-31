import React from 'react'
import {Link,useLocation} from "react-router-dom";

const Navigation = () => {
  let location = useLocation();

  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
            <Link className="navbar-brand" to="#">
            <img src="/calendar-solid.svg" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" />
            Career Hub
            </Link>   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active": " "}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/employerdasboard"? "active": " "}`} to="/employerdasboard">Employer Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/candidatedashboard"? "active": " "}`} to="/candidatedashboard">Candidate Dashboard</Link>
        </li>
      </ul>
   
    </div>
  </div>
</nav>

  )
}

export default Navigation
