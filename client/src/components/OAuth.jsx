import { app } from '../firebase'
import { GoogleButton } from './Button'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../app/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt : "select_account"})

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', { 
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL
                })
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <button className='w-full' onClick={handleGoogleClick}>
      <GoogleButton />
    </button>
  )
}

export default OAuth