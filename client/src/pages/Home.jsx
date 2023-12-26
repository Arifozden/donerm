import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ProductItem from '../components/ProductItem';


export default function Home() {

  const [electronics, setElectronics] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [books, setBooks] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [other, setOther] = useState([]);
  

  SwiperCore.use([Navigation]);

  console.log();

  const products = [...electronics, ...clothes, ...accessories, ...books, ...furniture, ...other];
  
  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const res = await fetch('/api/product/get?category=Electronics&limit=4') ;
        const data = await res.json();
        setElectronics(data);
        fetchClothes();
      } catch (error) {
        console.log(error)
      }
    };

    const fetchClothes = async () => {
      try {
        const res = await fetch('/api/product/get?category=Clothes&limit=4') ;
        const data = await res.json();
        setClothes(data);
        fetchAccessories();
      } catch (error) {
        console.log(error)
      }
    };

    const fetchAccessories = async () => {
      try {
        const res = await fetch('/api/product/get?category=Accessories&limit=4') ;
        const data = await res.json();
        setAccessories(data);
        fetchBooks();
      } catch (error) {
        console.log(error)
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/product/get?category=Books&limit=4') ;
        const data = await res.json();
        setBooks(data);
        fetchFurniture();
      } catch (error) {
        console.log(error)
      }
    };

    const fetchFurniture = async () => {
      try {
        const res = await fetch('/api/product/get?category=Furniture&limit=4') ;
        const data = await res.json();
        setFurniture(data);
        fetchOther();
      } catch (error) {
        console.log(error)
      }
    };

    const fetchOther = async () => {
      try {
        const res = await fetch('/api/product/get?category=Other&limit=4') ;
        const data = await res.json();
        setOther(data);
      } catch (error) {
        console.log(error)
      }
    }; 
    fetchElectronics();
  }, [])

  return (
    <div>
      {/* top*/}
        <div className='flex  flex-col gap-4 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl mb-6'>Help with <span className='bg-red-300 text-slate-700'>happiness</span>,
          </h1><h1 className='text-slate-700 font-bold text-3xl lg:text-6xl mb-3'>
          Make others <span className='bg-orange-300 text-slate-800'>happy!</span></h1>
          <div className='text-gray-500 text-l sm:text-m'>
            Everyone has right to live <span className='bg-green-300 text-slate-900'>better!</span>
            <br />
            You can make it <span className='bg-cyan-300 text-slate-950'>happen!</span>
          </div>
          <Link to={'/search'} className='text-l sm:text-m text-blue-800 font-bold hover:underline'>Let's do it <span className='bg-orange-600 '>now!!!</span></Link>
        </div>
      {/* swiper*/}
      <Swiper navigation>{products.map((product) => (
          <SwiperSlide>
          <div style={{background: `url(${product.images[0]}) center no-repeat`, backgroundSize:"cover"}} className='h-[500px]' key={product._id}></div>
        </SwiperSlide>
        ))
      }
        
      </Swiper>
      {/* products in categories*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {electronics && electronics.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Electronics</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Electronics'}>See all in Electronics</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {electronics.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}

{clothes && clothes.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Clothes</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Clothes'}>See all in Clothes</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {clothes.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}

{accessories && accessories.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Accessories</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Electronics'}>See all in Accessories</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {accessories.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}

{books && books.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Books</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Books'}>See all in Books</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {books.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}

{furniture && furniture.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Furniture</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Furniture'}>See all in Furniture</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {furniture.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}

{other && other.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Other</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?category=Other'}>See all in Other</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {other.map((product) => (
                  <ProductItem product={product} key={product._id} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
