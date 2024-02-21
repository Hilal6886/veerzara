import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,  sendEmailVerification,
} from "srevices/users.service";
import {useAuthValue} from './AuthContext'
import "./Signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState("");
  const [user, loading, ] = useAuthState(auth);
  const [error, setError] = useState('')
  const navigate = useNavigate();

 
  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }
  const register = async (e) => {
    e.preventDefault();
    setError('');
  
    if (validatePassword()) {
      try {
        const userCredential = await registerWithEmailAndPassword(name, email, password);
  
        console.log('User Credential after registration:', userCredential);
  
        if (userCredential && userCredential.user) {
          const user = userCredential.user;
  
          console.log('User after registration:', user);
  
          await sendEmailVerification(user);
          console.log('Email verification sent successfully');
          navigate('/verify-email');
        } else {
          console.error('User not available in userCredential:', userCredential);
          setError('Failed to register. Please try again.');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setError(err.message);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8  mx-[1rem] rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={register}>
          <input
            type="text"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-6  text-gray-200 outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <button
          className="w-full bg-blue-100  border-blue-700 flex gap-2  justify-center text-black rounded-md py-3 mt-2 hover:bg--600 transition duration-300"
          onClick={signInWithGoogle}
        >
          <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Sign up with Google</span>
        </button>
       
        <div className="text-sm mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login"> <span className="text-blue-800"> Sign In</span></Link>
        </div>
        </div>
    </div>
  );
  
}
export default Signup;