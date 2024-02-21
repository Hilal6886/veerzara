import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from  "srevices/users.service";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8  mx-[1rem] rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Reset Your Password</h1>
        <input
          type="text"
          className="w-full bg-gray-100 border-2 border-gray-200 rounded-md p-3 mb-4 outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 transition duration-300"
          onClick={() => sendPasswordReset(email)}
        >
          Send Password Reset Email
        </button>
        <div className="text-sm mt-4 text-center text-blue-500">
           <Link to="/login">Login</Link> 
        </div>
      </div>
    </div>
  );
  
}
export default Reset;