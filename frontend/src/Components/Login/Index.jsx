import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './login.css'
import { GovernomentContext } from '../Context/GovernorateContext';
export default function Login() {
  let {errormsg, user, setUser, logIn, loading} = useContext(GovernomentContext);

    JSON.stringify(user);
    function getData(e){
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    return (
      <div className='log vh-100'>
        <h1 className="text-center fw-bold py-5 headLine headLine">Login</h1>
        <div className="loginForm p-5 wrapper rounded-4 mx-auto">
          {errormsg?.length? <h3 className='alert alert-danger'>{errormsg}</h3>:""}
          <form onSubmit={logIn}>
            <label className='form-label  headLine fw-bold' htmlFor="email"><i class="fa-solid fa-envelope me-2"></i>E-mail</label>
            <input onChange={getData} className='form-control mb-3' type="email" id='email' name='email' placeholder="E-mail" />
            <label className='form-label  headLine fw-bold' htmlFor="password"><i class="fa-solid fa-lock me-2"></i>Password</label>
            <input onChange={getData} className='form-control mb-3' type="password" id='password' name='password' placeholder="Password" />
            <div className="d-flex justify-content-center">
            <button type='submit' className="sub-Btn fw-bold btn bg-white rounded-5 w-50 p-3 mt-4">
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
          <div className="card-footer mt-4 text-center">
                    <p className="text-white">
                        <Link to={"/forgotpassword"} className="fw-bold text-white">
                            Forgot Password?
                        </Link>
                    </p>
        </div>
        </div>
        </div>
    )
  }
