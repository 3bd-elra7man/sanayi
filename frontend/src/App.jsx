import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar/Index";
import Register from "./Components/Register/Index"
import Login from './Components/Login/Index';
import JobDetails from './Components/JobDetails/JobDetails';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from 'react';
import GetProfile from './Components/GetProfile';
import CreateJobPage from './Components/CustomerPages/CreateJob';
import JobListingsPage from './Components/CustomerPages/JobListingPage';
import CreateListingPage from './Components/ServiceProviderPages/CreateService';
import ServiceListingsPage from './Components/ServiceProviderPages/ServiceListing';
import Home from './Components/LandingPage/Home';
function App() {
  function check() {
    if (localStorage.getItem("isAuthenticated") !== null) {
      localStorage.setItem("isAuthenticated", "true");
        }}
  function ProtectedRoute({children}){
    if(localStorage.getItem("isAuthenticated")===null){
      return <Navigate to="/"/>
    }
    else{
      return children;
    }  
    }
    useEffect(()=>{
      check();
    },[])
  return (
    <>
<Navbar/>
  <div>
    <div>
    <ToastContainer position='top-right' />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="jobdetails" element={
          <ProtectedRoute>
            <JobDetails/>
          </ProtectedRoute>} />
          <Route path="createjob" element={
            <ProtectedRoute>
            <CreateJobPage/>
            </ProtectedRoute>} />
        <Route path="joblisting" element={
          <ProtectedRoute>
          <JobListingsPage/>
          </ProtectedRoute>} />
          <Route path="createservice" element={
          <ProtectedRoute>
          <CreateListingPage/>
          </ProtectedRoute>} />
          <Route path="servicelisting" element={
          <ProtectedRoute>
          <ServiceListingsPage/>
          </ProtectedRoute>} />
          <Route path="getprofile" element={
            <ProtectedRoute>
            <GetProfile/>
            </ProtectedRoute>} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/>} />
      </Routes>
      </div>
  </div>
    </>
  )
}
 export default App;