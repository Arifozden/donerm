import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
  return (
    <header className='bg-blue-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
            <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Doner</span>
            <span className='text-slate-700'>Meg</span>
        </h1>
        </Link>
        <form className='bg-blue-100 p-2 rounded-md flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64 placeholder:text-blue-400'/>
            <FaSearch className='text-blue-400' />
        </form>
        <ul className='flex gap-4'>
            <Link to='/products'>
            <li className='font-medium text-blue-500 hover:underline'>Products</li>
            </Link>
            <Link to='/about'>
            <li className='hidden font-medium sm:inline text-blue-500 hover:underline'>About</li>
            </Link>
            <Link to='profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                ) : (
                    <li className='font-medium  text-blue-500 hover:underline'>Sign In</li>
                )}
            </Link>
        </ul>
        </div>
    </header>
  );
}
