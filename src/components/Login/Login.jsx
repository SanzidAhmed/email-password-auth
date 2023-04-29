import React, { useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app)

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            if(!loggedUser.emailVerified){
                alert('your email is not verified')
            }
            setSuccess('user login successful');
            setError('')
        })
        .catch(error => {
            setError(error.message);
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>please login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name='email'
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-check mt-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                    </label>
                </div>
                <p><small>new to this website? please <Link to="/register">register</Link></small></p>
                <p>{success}</p>
                <p className='text-danger'>{error}</p>
                <button type="submit" className="btn btn-primary mt-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;