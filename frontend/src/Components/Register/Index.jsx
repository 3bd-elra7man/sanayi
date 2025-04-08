import React, { useContext, useState } from 'react';
import './register.css';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GovernomentContext } from "../Context/GovernorateContext";

export default function Register() {
  let { GOVERNORATE_REGIONS, governorate, setGovernorate, region, setRegion, notify } = useContext(GovernomentContext);
  const [errorslist, setErrorslist] = useState([]);
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    governorate: "",
    region: "",
    role: "",
    phoneNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password

  const handleGovernorateChange = (e) => {
    setGovernorate(e.target.value);
    setRegion(""); // Reset region when governorate changes
  };

  function getData(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value); // Update confirmPassword state
  }

  function validateRegister() {
    let scheme = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
      governorate: Joi.string().min(3).max(30).required(),
      region: Joi.string().min(3).max(30).required(),
      role: Joi.string().alphanum().min(3).max(30).required(),
      phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$')).required(),
    });

    // Validate user object with Joi
    const joiResult = scheme.validate(user, { abortEarly: false });

    // Custom validation for confirmPassword
    let errors = joiResult.error ? joiResult.error.details : [];
    if (user.password !== confirmPassword) {
      errors.push({
        message: "Confirm Password must match Password",
        context: { key: "confirmPassword" },
      });
    }

    return { error: errors.length > 0 ? { details: errors } : null };
  }

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    let validateResult = validateRegister();
    setErrorslist(validateResult?.error?.details || []);
    if (validateResult?.error?.details) {
      console.log(validateResult?.error?.details);
      setLoading(false);
    } else {
      // Send only the user object to the backend (excludes confirmPassword)
      axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, user, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setLoading(false);
          notify(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          setErrormsg(err?.message);
          setLoading(false);
          console.log(err);
        });
    }
  }

  return (
    <div className="rg dvh-100">
      <h1 className="py-4 text-center fw-bold headLine">Register to Sanay'i</h1>
      <div className="container">
        <div className="p-4 mx-auto p-md-5 regForm rounded-4">
          {errorslist?.map((err, index) => (
            <h3 key={index} className="alert alert-danger">{err.message}</h3>
          ))}
          {errormsg?.length ? (<h3 className="alert alert-danger">{errormsg}</h3>) : ""}
          <form onSubmit={submitData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="firstName">
                  <i className="fa-solid fa-signature me-2"></i>First Name
                </label>
                <input
                  onChange={getData}
                  className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  onChange={getData}
                  className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label headLine fw-bold" htmlFor="email">
                <i className="fa-solid fa-envelope me-2"></i>E-mail
              </label>
              <input
                onChange={getData}
                className="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
              />
            </div>
          <div className="mt-3 row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label headLine fw-bold" htmlFor="password">
                <i className="fa-solid fa-lock me-2"></i>Password
              </label>
              <input
                onChange={getData}
                className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label headLine fw-bold" htmlFor="confirmPassword">
                <i className="fa-solid fa-lock me-2"></i>Confirm Password
              </label>
              <input
                onChange={handleConfirmPassword}
                className="form-control"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
          </div>

            <div className="mt-3 row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="governorate">
                  <i className="fa-solid fa-location-dot me-2"></i>Governorate
                </label>
                <select
                  id="governorate"
                  className="form-select"
                  value={governorate}
                  name="governorate"
                  onChange={(e) => {
                    handleGovernorateChange(e);
                    getData(e);
                  }}
                >
                  <option value="">-- Select Governorate --</option>
                  {Object.keys(GOVERNORATE_REGIONS).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="region">
                  Region
                </label>
                <select
                  id="region"
                  className="form-select"
                  value={region}
                  name="region"
                  onChange={(e) => {
                    setRegion(e.target.value);
                    getData(e);
                  }}
                  disabled={!governorate}
                >
                  <option value="">-- Select Region --</option>
                  {governorate && GOVERNORATE_REGIONS[governorate].map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="role">
                  <i className="fa-solid fa-helmet-safety me-2"></i>Role
                </label>
                <select className="form-select" id="role" name="role" required onChange={getData}>
                  <option value="">Choose a role...</option>
                  <option value="Customer">Customer</option>
                  <option value="Craftsman">Craftsman</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label headLine fw-bold" htmlFor="phoneNumber">
                  <i className="fa-solid fa-square-phone me-2"></i>Phone Number
                </label>
                <input
                  onChange={getData}
                  className="form-control"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="mt-5 d-flex justify-content-center">
              <button type="submit" className="p-3 bg-white sub-Btn fw-bold btn rounded-5 w-25 w-md-25">
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center card-footer">
            <p className="text-white">
              Already have an account?{" "}
              <Link to={"/login"} className="fw-bold headLine">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}