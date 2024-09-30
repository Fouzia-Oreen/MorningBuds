
import { Alert, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../app/user/userSlice';
import { GoogleButton, SigninButton } from '../components/Button';
import OAuth from '../components/OAuth';

// import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
          return dispatch(signInFailure('Please fill out all fields.'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure())
      }
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5  p-4 md:gap-20'>

        {/* left */}
        <div className='flex-1 items-center flex flex-col justify-self-start'>
        <h1 className=' px-2 text-3xl underline  font-semibold '>Sign In</h1>       
          <p className='text-sm my-5 text-wrap '>
            Sign In email & password. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
      <div className='flex-1'>

      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
      <div className="relative p-2 flex items-center justify-center bg-[#b1ccf3] dark:bg-[#191d24]">
        <label htmlFor="Youremail" className='  dark:bg-[#191d24] bg-[#b1ccf3] absolute left-2 -top-2 mx-2 px-2  '>Email ... </label>
        <input type="email" className=' py-2 px-5 rounded-md w-full border-[1px] bg-[#b1ccf3] dark:bg-[#191d24] dark:border-[#6f7580] border-opacity-40 border-[#192938b2] dark:border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 ' id="email" onChange={handleChange}/>    
        </div>
        <div className="relative p-2 flex items-center justify-center ">
        <label htmlFor="Youremail" className='  dark:bg-[#191d24] bg-[#b1ccf3] absolute left-2 -top-2 mx-2 px-2  '>Password ... </label>
        <input type="password" className=' py-2 px-5 rounded-md w-full border-[1px] bg-[#b1ccf3] dark:bg-[#191d24] dark:border-[#6f7580] border-opacity-40 border-[#192938b2] dark:border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 ' id="password" onChange={handleChange}/>  
        </div>
        <div className='flex flex-col'>
        <Button class="w-full" type="submit" disabled={loading} > 
              { loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
              </>
              ) : (<SigninButton  />)}
        </Button>
        <Button class="w-full" type="submit" disabled={loading} > 
              { loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
              </>
              ) : (<OAuth />)}
        </Button>
        </div>

      </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className=''>Donot have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}