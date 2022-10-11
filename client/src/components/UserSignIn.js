import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Context from "../context/Context";

export function UserSignIn(){
    const { signInAuth } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const [errors, setErrors] = useState([]);

    const emailRef = useRef();
    const passwordRef = useRef();

    // handle the user login action 
    const handleSubmit = (e) =>{
        e.preventDefault();
        const emailAddress = emailRef.current.value;
        const password = passwordRef.current.value;
        signInAuth(emailAddress, password)
            .then((user) => {
                if(user === null){
                    setErrors(["Username or password is incorrect"]);
                }
                else{
                    if(location.state?.from){
                        navigate(location.state.from)
                    }
                    else{
                        navigate('/')
                    }
                }
            })
            .catch((err) => {
                console.error(err)
            })
        e.currentTarget.reset();
    }
    //navigate the user to the course list if they cancel the login operation
    const cancelHandler = (e) =>{
        navigate('/');
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign in</h2>
                { errors.length > 0 ? <h3 className="validation--errors">{errors}</h3> : <></>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailRef} required></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={passwordRef} required></input>
                    <button className="button sign" type="submit">Sign In</button>
                    <button className="button button-secondary cancel" onClick={cancelHandler}>Cancel</button>
                </form>
                <p>
                    Don't have a user account? <Link to="/signup" className="link">Click here to sign up</Link>
                </p>
            </div>
        </main>
    )
}