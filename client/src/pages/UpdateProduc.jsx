import { useEffect, useState } from 'react';
import { getDownloadURL,getStorage,ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateProduct() {
    const {currentUser} = useSelector( state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        images: [],
        title:'' ,
        description:'',
        condition:'',
        price:0 ,
        category:'' ,
        userRef:currentUser.username, 
        email:currentUser.email,
        phone:'',
        address:'' ,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        const fetchProduct = async () => {
            const productId = params.productId;
            const res = await fetch(`/api/product/get/${productId}`);
            const data = await res.json();
            if(data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        }
        fetchProduct();
    }, []);
    
    
    const handleImageSubmit = (e) => {
        if(files.length > 0 && files.length + formData.images.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i< files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, images: formData.images.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image uploading failed (max 2 mb per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per product');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error)=>{
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
        if(e.target.type === 'select-one') {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.images.length < 1) return setError('You need to upload at least one image');
            setLoading(true);
            setError(false);

            const res = await fetch(`/api/product/update/${params.productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if(data.success === false) {
                setError(data.message);
            }
            navigate(`/product/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update Product</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-3 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='60' minLength='3' required
                onChange={handleChange} value={formData.title} />
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required
                onChange={handleChange} value={formData.description} />
                <select className='border p-3 rounded-lg' id="condition" required onChange={handleChange} value={formData.condition}>
                    <option value=''>Select condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Slightly Used</option>
                    <option value='Very Used'>Very Used</option>
                </select>
                <input type="number" placeholder='Price (NOK)' className='border p-3 rounded-lg' id='price' maxLength='10' minLength='1' min='1' required
                onChange={handleChange} value={formData.price} />
                <select className='border p-3 rounded-lg' id='category' required onChange={handleChange} value={formData.category}>
                    <option value=''>Select category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Clothes'>Clothes</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Books'>Books</option>
                    <option value='Furniture'>Furniture</option>
                    <option value='Other'>Other</option>
                </select>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='userRef' required
                onChange={handleChange} value={formData.userRef} />
                <input type="text" placeholder='E-mail' className='border p-3 rounded-lg' id='email' required
                onChange={handleChange} value={formData.email} />
                <input type="text" placeholder='Phone' className='border p-3 rounded-lg' id='phone' maxLength='8' minLength='8' required
                onChange={handleChange} value={formData.phone}  />
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='600' minLength='10' required
                onChange={handleChange} value={formData.address} />
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e) => setFiles(e.target.files)} className='p-1 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                    <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-1 bg-green-500 border text-white  rounded-lg uppercase hover:opacity-80 disabled:opacity-80'>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
                {formData.images.length > 0 && formData.images.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt='product image' className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={ () => handleRemoveImage(index)}
                            className='p-2 bg-red-500 text-white rounded-lg uppercase hover:opacity-80'>Delete</button>
                        </div>
                    ))
                }
            <button disabled={loading || uploading} className='p-2 bg-blue-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-70'>
                {loading ? 'Updating...' : 'Update'}
            </button>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            </div>
            
        </form>
    </main>
  )
}
