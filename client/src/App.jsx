import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Products from './pages/Products';
import PrivateRoute from './components/privateRoute';
import CreateProduct from './pages/CreateProduct';
import UpdateProduc from './pages/UpdateProduc';
import Product from './pages/Product';
import Search from './pages/Search';

export default function App() {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path='/search' element={<Search />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/update-produc/:productId" element={<UpdateProduc />} />
    </Route>
    <Route path="/products" element={<Products />} />
  </Routes>
  </BrowserRouter>
  );
}
