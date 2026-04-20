
import {useAxios} from '../Components/useAxios';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import {addItem} from "../Reducer/cartSlice"


export default function Products() {


    let {products} = useAxios('http://localhost:3000/products');

    const navigate = useNavigate();

    let dispatch = useDispatch();
    let cartProducts = useSelector((state) => state.cart);

    const addItems = (product) => {

        let checkCartProduct = cartProducts.some((checkProduct) => checkProduct.id === product.id);

        if(!checkCartProduct)
        {
            dispatch(addItem(product));
            navigate('/cart');

        }
        else{
            alert("Product already added in cart !");
        }

    }

    return (
        <div>
            <h1>Products</h1>
              
            
            <Button variant="contained" onClick={() => navigate('/add-product')}>
                Add Products
            </Button> &nbsp;
                  <Button variant="contained" color="warning" onClick={() => navigate('/cart')}>
                Cart
            </Button>

            {
                products.map((product) => {
                    return (
                        
                        <div className = "card" key={product.id}>
                            <h2>{product.title}</h2>
                            <img src={product.image} alt={product.title} width="100" />
                            <p>Description : {product.description}</p>
                            <p>Price : ${product.price}</p>
                            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                            <Button variant="contained" onClick = {() => addItems(product)} >Add To Cart</Button> &nbsp;
                            <Button variant="contained" onClick={() => {navigate(`/update-product/${product.id}`)}}>Edit</Button>  &nbsp;
                            <Button variant="contained" color="error" onClick={() => {navigate(`/delete-product/${product.id}`)}}>Delete</Button>
                        </div>
                    
                    );
                })
            }
        </div>
    );
}