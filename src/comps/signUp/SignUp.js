import React, { useState } from 'react';
import '../../static/signup/signup.css'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';

function SignUp(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const clickHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:4000/signup', {
            name : name,
            username: username,
            password: hashIt(password)
        })
        .then((res) => {
            setLoading(false);
            alert(res.data.message)
           navigate('/signin')
        })
        .catch((err) => {
            setLoading(false);
            console.error(err)
            // if(err) ;
        })
    }

    const hashIt = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    return(
         <div id="signup" className="d-flex flex-column justify-content-center align-items-center mt-0">
             <span className="signup_name"><h2>Friendsbook</h2></span>
             <div className="signupcontainer w-25 container">
                 <div className="signinbody d-flex flex-column align-items-center container">
                 <div className="heading mt-4">
                        <h3>Create a new account</h3>
                        <span className="signup_center"><p>It's quick and easy.</p></span>
                        
                    </div>
                    <div className="d-flex flex-column mt-4 w-100">
                    <form className="p-3 signup_form">
                        <input className="w-100 signup_input" type="text" name="name" placeholder="Enter Your full name" onChange={(e) => setName(e.target.value)} required />
                        <input className="w-100 mt-5 signup_input" type="text" name="username" placeholder="Enter a unique username" onChange={(e) => setUsername(e.target.value)} required />
                        <input className="w-100 mt-5 signup_input" type="password" name="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} required />
                        <input className="w-100 mt-5 signup_btn" type="button" name="submit" value={loading ? 'Loading...' : 'SIGN UP'} onClick={clickHandler} disabled={loading} />
                        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                        <small><span id="or"></span> OR</small><br />
                        <small><span id="acc" >Have an account? </span></small>
                        <Link to="/signin"><input className="w-100 mt-2 mb-5 signup_btn" type="button" value={loading ? 'Loading...' : 'SIGN IN'} disabled={loading} /></Link>
                    </form>
                    
                    </div>
                </div>
             </div>
    </div>
    );
}

export default SignUp;
