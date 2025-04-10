import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { GovernomentContext } from '../Context/GovernorateContext';

export default function Login() {
  let { errormsg, user, setUser, logIn, loading } = useContext(GovernomentContext);

  function getData(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="log dvh-100">
      <h1 className="py-5 text-center fw-bold headLine">Login</h1>
      <div className="container">
        <div className="p-4 mx-auto loginForm p-md-5 rounded-4">
          {errormsg?.length ? <h3 className="alert alert-danger">{errormsg}</h3> : ""}
          <form onSubmit={logIn}>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="p-3 mt-4 bg-white sub-Btn fw-bold btn rounded-5 w-50 w-md-25"
              >
                {loading ? (
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center card-footer">
            <p className="text-white">
              <Link to={"/forgotpassword"} className="text-white fw-bold">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}