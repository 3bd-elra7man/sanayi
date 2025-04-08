import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { GovernomentContext } from '../Context/GovernorateContext';

export default function Navbar() {
  const { isAuthenticated, logOut } = useContext(GovernomentContext);
  const storedUserData = localStorage.getItem('userData');
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Left Side - Role Specific Links */}
        <div className="navbar-section left-links">
          {parsedUserData?.role === 'Customer' && (
            <ul className="flex-row navbar-nav">
              <li className="nav-item me-3">
                <Link className="text-white nav-link fs-5 fw-bold" to="createjob">Create Job</Link>
              </li>
              <li className="nav-item">
                <Link className="text-white nav-link fs-5 fw-bold" to="Joblisting">Craftsmen Available</Link>
              </li>
            </ul>
          )}
          {parsedUserData?.role === 'Craftsman' && (
            <ul className="flex-row navbar-nav">
              <li className="nav-item me-3">
                <Link className="text-white nav-link fs-5 fw-bold" to="createservice">Add Service</Link>
              </li>
              <li className="nav-item">
                <Link className="text-white nav-link fs-5 fw-bold" to="servicelisting">Jobs Dashboard</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Center - Logo */}
        <div className="navbar-section logo-center">
          <Link className="nav-link" to="/">
            <div className="my-2 d-flex align-items-center">
              <svg className="w-10 h-10 text-emerald-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1 className="mx-2 font-bold fs-3 text-emerald-300">Sana'yi</h1>
            </div>
          </Link>
        </div>

        {/* Right Side - Auth Links */}
        <div className="navbar-section right-links">
          {!isAuthenticated && (
            <ul className="flex-row navbar-nav">
              <li className="nav-item me-3">
                <Link className="text-white nav-link fs-5 fw-bold" to="register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="text-white nav-link fs-5 fw-bold" to="login">Login</Link>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="text-white nav-link fs-5 dropdown-toggle fw-bold"
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
                      <i className="fs-5 fa-solid fa-user me-2"></i>Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" onClick={logOut} to="login">
                      <i className="fa-solid fs-5 fa-right-from-bracket me-2"></i>Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}