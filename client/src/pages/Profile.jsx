import { useSelector } from "react-redux"
import { useRef,useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showProductsError, setShowProductsError] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const dispatch = useDispatch();
  console.log(formData);

  // firebase storage settings
  // allow read;
  //     allow write: if
  //     request.resource.size <2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload =  (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({...formData, avatar: downloadURL})
      );
  });
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update user profile
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(data.message));
    }
  };

  const handleShowProducts = async () => {
    try {
      setShowProductsError(false);
      const res = await fetch(`/api/user/products/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setShowProductsError(true);
        return;
      }
      setUserProducts(data);
    } catch (error) {
      setShowProductsError(true);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      const res = await fetch(`/api/product/delete/${productId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img
        onClick={()=>fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-500">File upload error (image have to be less than 2 mb)</span>) :
          filePerc > 0 && filePerc < 100 ? 
          (<span className="text-blue-500">{`Uploading ${filePerc}%`}</span>) : filePerc === 100 ?
          (<span className="text-green-500">Image uploaded successfully</span>)
          : ('')}
        </p>
        <input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" placeholder="e-mail" defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-blue-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-75">
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className="bg-green-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-90" to={"create-product"}>
            Create Product
        </Link>
      </form>
      <div className="flex mt-4 justify-center">
        <button onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg  mr-10 w-40">Delete Account</button>
        <button onClick={handleSignout} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg w-40">Sign Out</button>
      </div>

      <p className="text-red-500 mt-5">{error ? error : ''}</p>
      <p className="text-green-500 mt-5">{updateSuccess ? 'User updated successfully!' : ''}</p>
      <button onClick={handleShowProducts} className="bg-green-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-90 w-full">Show Products</button>
      <p className="text-red-500 mt-5">{showProductsError ? 'Error showing products' : ''}</p>
      
      {userProducts && userProducts.length > 0 && (
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-xl font-semibold">Your Products</h1>

        {userProducts.map((product) => (<div key={product._id} className="border rounded-lg p-3 flex justify-between items-center">
        <Link to={`/product/${product._id}`}>
          <img src={product.images[0]} alt="product cover" className="h-16 w-16 object-contain" />
        </Link>
        <Link className="flex-1 text-slate-500 font-semibold hover:underline truncate gap-4" to={`/product/${product._id}`}>
          <p>{product.title}</p>
        </Link>

        <div className="flex flex-col item-center space-y-4">
          <button onClick={()=>handleProductDelete(product._id)} className="bg-red-500 uppercase p-1 rounded-lg text-white">Delete</button>
          <Link to={`/update-produc/${product._id}`}>
          <button className="bg-green-500 uppercase p-1 rounded-lg text-white">Edit</button></Link>
        </div>

        </div>))}
      </div>
      
      )
    }



    </div>
  );
}
