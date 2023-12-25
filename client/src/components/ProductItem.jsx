import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ProductItem({product}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/product/${product._id}`}>
            <img src={product.images[0]} alt={product.name} className='h-[320px] sm:h-[220px]
            w-full object-cover hover:scale-105 transition-scale duration-300' />
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{product.title}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className='h-4 w-4 text-green-700' />
                    <p className='text-sm text-gray-700 truncate'>{product.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>{product.price.toLocaleString('en-US')} kr</p>
            </div>
        </Link>
    </div>
  )
}
