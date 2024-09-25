





const NameInput = () => {
  return (
    <div className="relative p-2 flex items-center justify-center bg-slate-200">
    <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2  '>Your Name ... </label>
    <input type="text" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="username" />  
  </div>
  )
}

const EmailInput = () => {
  return (
    <div className="relative p-2 flex items-center justify-center bg-slate-200">
    <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2  '>Email ... </label>
    <input type="email" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="email" />  
  </div>
  )
}

const PasswordInput = () => {
  return (
    <div className="relative p-2 flex items-center justify-center bg-slate-200">
    <label htmlFor="Yourname" className='  text-neutral-500 bg-neutral-50 absolute left-2 -top-2 mx-2 px-2 '>Password ... </label>
    <input type="password" className=' py-2 px-5 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600' id="password"/>  
  </div>
  )
}

export {NameInput, EmailInput, PasswordInput }