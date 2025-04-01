import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GovernomentContext } from '../../../Context/GovernorateContext';

function WelcomeSection() {
  const { isAuthenticated } = useContext(GovernomentContext);
  const storedUserData = localStorage.getItem('userData');
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

  // Determine the target route based on role
  let targetRoute = "/register"; // Default route if not authenticated
  if (isAuthenticated && parsedUserData) {
    targetRoute = parsedUserData.role === 'Customer' ? '/createjob' : '/servicelisting';
  }

  return (
    <section className="text-center mb-16 relative">
      <div className="absolute inset-0 bg-emerald-500 bg-opacity-10 blur-3xl -z-10"></div>
      <h2 className="text-5xl font-bold mb-5 text-emerald-300 mt-5">Welcome to Sana'yi</h2>
      <p className="text-xl max-w-2xl mb-5 mx-auto text-green-100">
        Connecting individuals within Egyptian communities by offering and finding services and educational opportunities.
      </p>
      <Link className='nav-link' aria-current="page" to={targetRoute}>
        <div className="mt-8">
          <button className="bg-emerald-500 text-white px-14 py-3 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </Link>
      <section className="my-16 text-center relative d-flex justify-center">
        <div className="absolute inset-0 bg-purple-500 bg-opacity-10 blur-3xl -z-10"></div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <i
            className="fa-solid me-14 fa-screwdriver-wrench text-emerald-300"
            style={{ fontSize: '6rem' }} // Custom size for consistency
          ></i>
          <i
            className="fa-solid me-14 fa-hammer text-emerald-300"
            style={{ fontSize: '6rem' }}
          ></i>
          <i
            className="fa-solid me-14 fa-toolbox text-emerald-300"
            style={{ fontSize: '6rem' }}
          ></i>
          <i
            className="fa-solid me-14 fa-handshake text-emerald-300"
            style={{ fontSize: '6rem' }}
          ></i>
        </div>
      </section>
    </section>   
  );
}

export default WelcomeSection;