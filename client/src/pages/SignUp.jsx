
import { Alert, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { GoogleButton, SignupButton } from '../components/Button';

// import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
          return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5  p-4 md:gap-20'>

        {/* left */}
        <div className='flex-1 items-center flex flex-col justify-self-start'>
        <h1 className=' px-2 text-3xl underline  font-semibold text-neutral-500'>Register</h1>       
          <p className='text-sm my-5 text-wrap text-neutral-500'>
            Please register with your name, email & password. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
      <div className='flex-1'>

      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
          {/* inputs */}
        <div className="relative p-2 flex items-center justify-center bg-slate-200">
          <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2  '>Your Name ... </label>
          <input type="text" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="username" onChange={handleChange}/>  
        </div>
        <div className="relative p-2 flex items-center justify-center bg-slate-200">
          <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2  '>Email ... </label>
          <input type="email" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="email" onChange={handleChange}/>  
        </div>
        <div className="relative p-2 flex items-center justify-center bg-slate-200">
          <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2 '>Password ... </label>
          <input type="password" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="password" onChange={handleChange}/>  
        </div>
        <div className='flex flex-col'>
        <Button class="w-full" type="submit" disabled={loading} > 
              { loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
              </>
              ) : (<SignupButton  />)}
        </Button>
        <Button class="w-full" type="submit" disabled={loading} > 
              { loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
              </>
              ) : (<GoogleButton  />)}
        </Button>
        </div>
            {/* <OAuth /> */}
      </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className='text-neutral-500'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
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