import { set } from 'mongoose';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function Contact({product}) {
    const [selger, setSelger] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
const fetchSelger = async () => {
    try {
        const res = await fetch(`/api/user/${product.userRef}`);
        const data = await res.json();
        setSelger(data);
    } catch (error) {
        console.log(error);
    }
} 
fetchSelger();
    }, [product.userRef])

  return (
    <>
    {selger && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{selger.username}</span> for 
            <span className='font-semibold'>{product.title.toLowerCase()}</span></p>
            <textarea name="message" id="message" rows="2" value={message} onChange={onChange}
            placeholder='Write your message here...' className='w-full border p-3 rounded-lg'></textarea>

            <Link to={`mailto:${selger.email}?subject=Regarding ${product.title}&body=${message}`}
            className='bg-green-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90'>
                Send Message
            </Link>

        </div> 
    )}
    </>
  )
}
