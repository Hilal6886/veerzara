import { useState, useEffect } from "react";
import { useNavigate,Routes, Route,useLocation} from "react-router-dom";
import './app.css';
import useAdmin from "../src/utils/hooks"

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "././firebase";
import ArfaSchoolLayout from "layouts/arfaschool/ArfaSchoolLayout.jsx";

import Signup from "pages/Signup";
import Login from "pages/Login";

import VerifyEmail from "pages/VerifyEmail";
import { AuthProvider } from 'pages/AuthContext'
import Reset from "pages/Reset";
import Explore from "components/Explore";
import useScrollToTop from "hooks/useScrollToTop";
import { ToastContainer } from "react-toastify";

const App = () => {
  useScrollToTop ();

  const [user, setUser] = useState(null);
  const location = useLocation();

  
  const Navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  useAdmin()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user || {});
      setCurrentUser(user || {})
    
    })
  }, [])
  return (
    <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
    <Routes>
     
     
      <Route path="/*" element={<ArfaSchoolLayout />} />
   
      <Route path="/arfaDigital/*" element={<Explore   />} />
      
      <Route path="/signup" element={!currentUser?.emailVerified ? <Signup /> : <Navigate to='/' replace /> } />
      <Route path="/login" element={<Login />} />
     
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset" element={<Reset />} />
     
   
    </Routes>
    <ToastContainer />
    </AuthProvider>
    
  );
};

export default App;
