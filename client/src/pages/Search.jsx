import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

export default function Search() {

    const navigate = useNavigate();
    const location = useLocation();

    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        category: '',
        condition: '',
        sort:'created_at',
        order:'desc'
    });

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCondition, setSelectedCondition] = useState('all');

    
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    console.log(products);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const categoryFromUrl = urlParams.get('category');
        const conditionFromUrl = urlParams.get('condition');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');


        if(searchTermFromUrl || categoryFromUrl || conditionFromUrl || sortFromUrl || orderFromUrl){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                category: categoryFromUrl || 'all',
                condition: conditionFromUrl || 'all',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'
            });
            setSelectedCategory(categoryFromUrl || 'all');
            setSelectedCondition(conditionFromUrl || 'all');
        };
        // if(searchTermFromUrl) setSidebardata({searchTerm: searchTermFromUrl || ''});
        // if(categoryFromUrl) setSelectedCategory(categoryFromUrl || 'all');
        // if(conditionFromUrl) setSelectedCondition(conditionFromUrl || 'all');
        // if(sortFromUrl) setSidebardata({sort: sortFromUrl || 'created_at'});
        // if(orderFromUrl) setSidebardata({order: orderFromUrl || 'desc'});

        const fetchProducts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/product/get?${searchQuery}`);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();

    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebardata((prevData) => ({
                ...prevData,
                searchTerm: e.target.value,
            }));
        }
    
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata((prevData) => ({
                ...prevData,
                sort,
                order,
            }));
        }
    
        if (e.target.id === 'category') {
            setSelectedCategory(e.target.value);
        }
    
        if (e.target.id === 'condition') {
            setSelectedCondition(e.target.value);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('category', selectedCategory); // Değişiklik burada
        urlParams.set('condition', selectedCondition); // Değişiklik burada
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 mb-4">
                    <label className='whitespace-nowrap font-semibold'>Search term : </label>
                    <input type="text" id='searchTerm' placeholder='Write to search'
                    className='border rounded-lg p-2 w-full' value={sidebardata.searchTerm} onChange={handleChange} />
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <label className=' font-semibold'>Category</label>
                    <select name="category" id="category" className='border rounded-lg p-2 w-full' onChange={handleChange}>
                        <option value="all">All</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Clothes'>Clothes</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Books'>Books</option>
                        <option value='Furniture'>Furniture</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <label className=' font-semibold'>Condition</label>
                    <select name='condition' id='condition' className='border rounded-lg p-2 w-full' onChange={handleChange}>
                        <option value='all'>All</option>
                        <option value='New'>New</option>
                        <option value='Used'>Used</option>
                        <option value='Very Used'>Very Used</option>
                    </select>
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <label className='whitespace-nowrap  font-semibold'>Sort by</label>
                    <select name='sort' id='sort_order' className='border rounded-lg p-2 w-full' onChange={handleChange}
                    value={sidebardata.sort + '_' + sidebardata.order}>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <div className='flex items-center justify-center'>
                  <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 items-center'>Search</button>  
                </div>
            </form>
        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-3'>Search Results : </h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && products.length === 0 && (
                <p className='text-xl text-red-500'>No products found</p>
                )}
                {loading && (<p className='text-xl text-slate-600 text-center w-full'>Loading...</p>)}
                {!loading && products && products.map((product) => (<ProductItem key={product._id} product={product}/>))}
            </div>
        </div>
    </div>
  )
}
