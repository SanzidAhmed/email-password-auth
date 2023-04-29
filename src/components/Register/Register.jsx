import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {
    const [error, setError] =  useState('');
    const [success, setSuccess] = useState('')
    const handleSubmit = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setSuccess('')
        console.log(email, password);
        if(!/(?=.*[A-Z])/.test(password)){
            setError('give a uppercase character');
            return;
        }
        else if(!/(?=.*\d)/.test(password)){
            setError('give a one numeric character'); 
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            setError('');
            event.target.reset();
            setSuccess('welcome to register')
            emailVerification(loggedUser)
        })
        .catch(error => {
            setError(error.message);
            
        })
    }
    const emailVerification = (loggedUser) => {
        sendEmailVerification(loggedUser)
        .then(result => {
            console.log(result);
            alert('please check your email for verification')
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
            <p><small>already have an account <Link to="/login">login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;