import './verifyEmail.css'
import {auth} from '../firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {useAuthValue} from './AuthContext'

import {useNavigate} from 'react-router-dom'

function VerifyEmail() {

  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8  mx-[1rem] rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
          <span className="text-blue-600">{currentUser?.email}</span>
        </p>
        <p className="mt-2 text-gray-600">Follow the instructions in the email to verify your account.</p>
        <button
          onClick={resendEmailVerification}
          disabled={timeActive}
          className="w-full bg-blue-500 text-white rounded-md py-3 mt-4 hover:bg-blue-600 transition duration-300"
        >
          Resend Email {timeActive && time}
        </button>
      </div>
    </div>
  );
  
}

export default VerifyEmail