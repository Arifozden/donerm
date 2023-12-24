import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form>
                <div className="flex items-center gap-2 mb-4">
                    <label className='whitespace-nowrap font-semibold'>Search term : </label>
                    <input type="text" id='searchTerm' placeholder='Write to search'
                    className='border rounded-lg p-2 w-full' />
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <label className=' font-semibold'>Category</label>
                    <select name="category" id="category" className='border rounded-lg p-2 w-full'>
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
                    <select name='condition' id='condition' className='border rounded-lg p-2 w-full'>
                        <option value='all'>All</option>
                        <option value='new'>New</option>
                        <option value='used'>Used</option>
                        <option value='veryused'>Very Used</option>
                    </select>
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <label className='whitespace-nowrap  font-semibold'>Sort by</label>
                    <select name='sort' id='sort_order' className='border rounded-lg p-2 w-full'>
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <div className='flex items-center justify-center'>
                  <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 items-center'>Search</button>  
                </div>
            </form>
        </div>
        <div className="div">
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-3'>Search Results : </h1>
        </div>
    </div>
  )
}
