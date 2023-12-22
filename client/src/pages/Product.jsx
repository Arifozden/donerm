import React from 'react';
import{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { Swiper, SwiperSlide } from 'swiper/react';
//import SwiperCore from 'swiper';
//import { Navigation } from 'swiper/modules';
//import 'swiper/css/bundle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Product() {
    //SwiperCore.use([Navigation]);
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();  

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

  return (
     <main className="flex flex-col items-center justify-center">
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}
        {product && !loading && !error && (
        <>
        <div className="flex">
      {product.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={product.title}
          className="w-32 h-32 object-cover mr-2"
        />
      ))}
    </div><h1>{product.title}</h1>
        
        </>)}
        
  </main>
  );
}
