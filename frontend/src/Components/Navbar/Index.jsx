import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import { GovernomentContext } from '../Context/GovernorateContext';
export default function Navbar() {
  let {isAuthenticated, logOut} = useContext(GovernomentContext);
  const storedUserData = localStorage.getItem('userData');
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <Link className='nav-link' aria-current="page" to="/">
        <div className="d-flex align-items-center ms-5 my-2">
      <svg className="h-10 w-10 text-emerald-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h1 className="text-2xl mx-2 font-bold text-emerald-300">Sana'yi</h1>
    </div>
    </Link>
    <div className="container">
    <div className="navbar-collapse" id="navbarSupportedContent">
      <div className="siteLinks">
      {parsedUserData?.role === 'Customer' && 
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item me-3">
      <Link className="nav-link text-white fw-bold" to="createjob">Create Job</Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link text-white fw-bold me-2" aria-current="page" to="Joblisting">Craftsmen Available</Link>
       </li>
      </ul>}
      {parsedUserData?.role === 'Craftsman' &&
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item me-3">
      <Link className="nav-link text-white fw-bold" to="createservice">Add Service</Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link text-white fw-bold me-2" aria-current="page" to="servicelisting">Jobs Dashboard</Link>
       </li>
      </ul>}
      </div>
    <div className="logLinks d-flex ms-auto">
      {!isAuthenticated &&       
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item">
      <Link className="nav-link text-white fw-bold" to="register">Register</Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link text-white fw-bold me-2" aria-current="page" to="login">Login</Link>
       </li>
      </ul>}
      {isAuthenticated === true &&  
        <ul className="navbar-nav mb-2 mb-lg-0">
  <li className="nav-item dropdown">
    <Link
      className="nav-link dropdown-toggle text-white fw-bold"
      id="profileDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fa-solid fa-id-card me-2"></i>{parsedUserData?.firstName}
    </Link>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
      <li>
        <Link className="dropdown-item" to="/getprofile">
        <i class="fa-solid fa-user me-2"></i>Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <Link className="dropdown-item" onClick={logOut} to="login">
        <i class="fa-solid fa-right-from-bracket me-2"></i>Logout
        </Link>
      </li>
    </ul>
  </li>
</ul>}
    </div>
    </div>
  </div>
</nav>
    </div>
  )
}

