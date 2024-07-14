import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks
import biyidp from "../images/biyid.png";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email.toLowerCase(),
      password,
    };
    setIsLoading(true)
    try {
    const res =  await axios.post(`${process.env.REACT_APP_BASEURL}/admin-login`, payload)

    if(res.data) {
      setIsLoading(false)
      navigate('/Portfoliopage');
      toast.success(res.data.message)
      sessionStorage.setItem("token", res.data.token)
    }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.error || error.response.data.message)
    }
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
        <input type="text" placeholder='Enter Username' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isPasswordVisible ?  <FaEyeSlash className="eye-icon" onClick={togglePasswordVisiblity}/> : <FaEye className="eye-icon"onClick={togglePasswordVisiblity}/> }        <Link to="/signup" className='pass-link'>Create account?</Link>
        <button type="submit">{isLoading ? "Loading..." : "Access"}</button>
      </form>
    </div>
  );
}
