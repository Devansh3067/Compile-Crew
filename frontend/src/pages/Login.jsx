import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Login = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://compile-crew.onrender.com/login', { email, password })
            .then(res => {
                console.log(res)
                if (res.data === "Success") {
                    localStorage.setItem("auth", true); 
                    toast.success('Login Success')
                    navigate("/home")
                }else{
                    toast.error('Wrong Credentials')
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
