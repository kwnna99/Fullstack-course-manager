import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";


export function UserSignUp () {

    //import from router dom
    const navigate = useNavigate();

    //import from context api
    const { createUser, signInAuth } = useContext(Context);

    //state hooks
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState('');

    //handles creating a new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }
        createUser(user)
            .then((res) => {
                setErrors(res);
                if(!firstName || !lastName || !emailAddress || !password){
                    console.log('Account could not be created.Missing info.')
                }
                //redirect the user to the default page after logging them in to the just created account
                else if(res === 201){
                    console.log('Account successfully created')
                    signInAuth(emailAddress, password);
                    navigate('/')
                }
            })
            .catch(err =>{
                console.log('Account could not be created')
            })
    }

//navigate the user to the main screen if they don't sign up
    const cancelHandler = () =>{
        navigate('/');
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                { errors && errors.length > 0 ? <ul className="validation--errors">{errors.map( (err,index) => <li className="validation--errors" key={index}>{err}</li>)}</ul> : <></>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="emailAddress" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button sign" type="submit">Sign Up</button>
                    <button className="button button-secondary cancel" onClick={cancelHandler}>Cancel</button>
                </form>
                <p>
                    Already have a user account? <Link to="/signin" className="link">Click here to sign in</Link>
                </p>
            </div>
        </main>
    )
}