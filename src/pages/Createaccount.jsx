import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks
import biyidp from "../images/biyid.png";

export default function Createaccount() {

    const navigate = useNavigate(); // Use useNavigate hook

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/Portfoliopage'); 
  };

  return (
    <div>
        <h1 className="pass-subheading">
            Create account
        </h1>
        <form onSubmit={handleFormSubmit} className="admin_login_form">
            <figure>
            <img src={biyidp} alt="" />
            </figure>
            <input type="text" placeholder='Enter Fullnamev' />
            <input type="password" placeholder='Enter Password' />
            <Link to="/AdminLogin" className='pass-link'>
                Have an account? Login
            </Link>
            <button type="submit">Access</button>
        </form>
    </div>
  )
}
