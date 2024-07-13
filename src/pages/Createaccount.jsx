import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate hooks
import biyidp from "../images/biyid.png";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function Createaccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const togglePasswordVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName,
      email: email.toLowerCase(),
      password,
    };
    console.log(password)
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/create-admin`,
        payload
      );

      if (res.data) {
        console.log(res.data);
        setIsLoading(false)
        navigate("/Portfoliopage");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="pass-subheading">Create account</h1>
      <form onSubmit={handleFormSubmit} className="admin_login_form">
        <figure>
          <img src={biyidp} alt="" />
        </figure>
        <input
          type="text"
          placeholder="Enter Fullname"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isPasswordVisible ?  <FaEyeSlash className="eye-icon" onClick={togglePasswordVisiblity}/> : <FaEye className="eye-icon"onClick={togglePasswordVisiblity}/> }
        <Link to="/AdminLogin" className="pass-link">
          Have an account? Login
        </Link>
        <button type="submit">{isLoading ? "loading..." : "Access"}</button>
      </form>
    </div>
  );
}
