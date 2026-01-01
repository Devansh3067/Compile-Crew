import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://compile-crew.onrender.com/',{name,email,password})
    .then(res => {console.log(res)
        toast.success('You are registered successfully')
        navigate("/login")
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={(e)=>setName(e.target.value)} required />
          <input type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
