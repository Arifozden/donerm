import React from 'react';
import{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { Swiper, SwiperSlide } from 'swiper/react';
//import SwiperCore from 'swiper';
//import { Navigation } from 'swiper/modules';
//import 'swiper/css/bundle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    FaEnvelopeSquare,
    FaMapMarkerAlt,
    FaMobileAlt,
    FaUserAlt,
  } from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Product() {
    //SwiperCore.use([Navigation]);
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();  
    const {currentUser} = useSelector((state) => state.user);
    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
               const res = await fetch(`/api/product/get/${params.productId}`);
            const data = await res.json();
            if(data.success === false){
                setError(true);
                setLoading(false);
                return;
            }
            setProduct(data);
            setLoading(false);
            setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
fetchProduct();             
    }, [params.productId]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

      let colorClass;

  // Duruma bağlı olarak renk sınıfını belirle
  if (!product || !product.condition) {
    colorClass = 'bg-white-900 w-full max-w-[200px] text-white text-center rounded-md';
  } else if (product.condition === 'New') {
    colorClass = 'bg-green-900 w-full max-w-[200px] text-white text-center rounded-md';
  } else if (product.condition === 'Used') {
    colorClass = 'bg-yellow-500 w-full max-w-[200px] text-white text-center rounded-md';
  } else {
    colorClass = 'bg-yellow-700 w-full max-w-[200px] text-white text-center rounded-md';
  }

  return (
    <main className="flex flex-col items-center justify-center pt-5">
    {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
    {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
    {product && !loading && !error && (
      <>
        <div className="flex">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.title}
              className="w-32 h-32 object-cover mr-2 cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
        <p className='text-2xl font-semibold uppercase'>{product.title}</p>
        <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-2 rounded-md'>{product.price.toLocaleString('en-US')} kr</p>
          
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 max-w-md">
              <img src={selectedImage} alt={product.title} />
              <button onClick={closeModal}>Close</button>
            </div>
            
          </div>
        )}
        <div className='flex'>
  <span className='font-semibold pr-2'>Condition:</span>
  {product && (
    <p className={`text-slate-800 ${colorClass} pl-2`}>{product.condition}</p>
  )}
</div>
<div className='flex flex-col max-w-[400px] mx-auto'>
        <p className='text-slate-800 pt-10'>
                <span className='font-semibold'>Description:</span> {product.description} <br/>
            </p></div>
        <ul>
            <li className='flex items-center mt-6 gap-2 text-slate-600  text-sm pt-3'><FaMapMarkerAlt className='text-green-700' />{product.address}</li>
            <li className='flex items-center mt-6 gap-2 text-slate-600  text-sm pt-3'><FaUserAlt className='text-green-700' />{product.userRef}</li>
            <li className='flex items-center mt-6 gap-2 text-slate-600  text-sm pt-3'><FaMobileAlt className='text-green-700' />{product.phone}</li>
            <li className='flex items-center mt-6 gap-2 text-slate-600  text-sm pt-3'><FaEnvelopeSquare className='text-green-700' /><a href={`mailto:${product.email}`}>{product.email}</a></li>
        </ul>
        {currentUser && product.userRef !== currentUser._id && !contact && (
           <button onClick={()=>setContact(true)} className='bg-green-700 text-white rounded-lg uppercase hover:opacity-90 p-2 mt-5'>Contact Selger</button> 
        )}
        {contact && <Contact product={product} />}
        
      </>
    )}
  </main>
  );
}
