import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GovernomentContext } from '../../../Context/GovernorateContext';
import bgImg from "../../../../images/pngtree-two-business-men-shaking-hands-outside-picture-image_2654108.jpg";

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
    <section className="relative mb-16 text-center">
      <div 
        className="flex flex-col items-center justify-center h-screen bg-center bg-cover" 
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-emerald-500 bg-opacity-10 blur-3xl -z-10"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <h2 className="mb-3 text-5xl font-bold text-emerald-300">Welcome to Sana'yi</h2>
          <p className="max-w-2xl mx-auto text-xl font-bold text-stone-100">
            Connecting individuals within Egyptian communities by offering and finding services and educational opportunities.
          </p>
          <Link className='nav-link' aria-current="page" to={targetRoute}>
            <div className="mt-8">
              <button className="py-3 text-lg font-semibold text-white transition duration-300 rounded-full shadow-lg bg-emerald-500 px-14 hover:bg-emerald-600">
                Get Started
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>   
  );
}

export default WelcomeSection;