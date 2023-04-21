import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../../firebase/firebase.config';

const auth = getAuth(app);
const Register = () => {
    const [error, serError] =  useState('')
    const handleSubmit = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            serError(error.message);
        })
    }
    const handleEmailChange = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div>
            <h1>register</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='your email' required />
                <br />
                <input type="password" name="password" id="password" placeholder='password' required />
                <br />
                <input type="submit" value="register" />
            </form>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Register;