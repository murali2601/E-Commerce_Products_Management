import { NavLink, useNavigate } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Products from './Products';
import Home from './Home';
import NotFound from './NotFound';
import UpdateProduct from './updateProduct';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct'
import Cart from './Cart'



export default function NavBar() {

  // const navigate = useNavigate();

  return (
    <div>
       <Router>
        <NavLink to="/">Home</NavLink> &nbsp;
        <NavLink to="/products">Products</NavLink> &nbsp;
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/add-product" element={<AddProduct />} />
                      <Route path="/update-product/:id" element={<UpdateProduct />} />
                      <Route path="/delete-product/:id" element={<DeleteProduct />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Router>
      
    </div>
  );
}