import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks
import biyidp from "../images/biyid.png";

export default function AdminLogin() {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/Portfoliopage'); 
  };

  return (
    <div>
      <h1 className="pass-subheading">
            Login
      </h1>
      <form onSubmit={handleFormSubmit} className="admin_login_form">
        <figure>
          <img src={biyidp} alt="" />
        </figure>
        <input type="text" placeholder='Enter Username' />
        <input type="password" placeholder='Enter Password' />
        <Link to="/" className='pass-link'>Create account?</Link>
        <button type="submit">Access</button>
      </form>
    </div>
  );
}
