import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='E-mail' className='border p-3 rounded-lg' id='email' />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-1 mt-5'>
        <p>Already have account? Click</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
