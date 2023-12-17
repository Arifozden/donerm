import React from 'react'

export default function CreateProduct() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Product</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-3 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='60' minLength='3' required />
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                <select className='border p-3 rounded-lg' id="condition" required>
                    <option value=''>Select condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Slightly Used</option>
                    <option value='Very Used'>Very Used</option>
                </select>
                <input type="number" placeholder='Price (NOK)' className='border p-3 rounded-lg' id='price' maxLength='10' minLength='1' required />
                <select className='border p-3 rounded-lg' id='category' required>
                    <option value=''>Select category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Clothes'>Clothes</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Books'>Books</option>
                    <option value='Furniture'>Furniture</option>
                    <option value='Other'>Other</option>
                </select>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='userRef' required />
                <input type="text" placeholder='Phone' className='border p-3 rounded-lg' id='phone' maxLength='8' minLength='8' required />
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='adress' maxLength='600' minLength='10' required />
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                    <button className='p-3 text-green-500 border border-green-300 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button className='p-3 bg-blue-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>Create Product</button>
            </div>
        </form>
    </main>
  )
}
