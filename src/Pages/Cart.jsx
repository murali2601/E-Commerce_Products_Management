import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {removeItem} from '../Reducer/cartSlice'


function Cart() {

    let navigate = useNavigate();

    let cartProducts = useSelector((state) => {
        return state.cart
    })
    // console.log(cartProducts);
    let dispatch = useDispatch();

    const handleDelete = (removeID) => {
        dispatch ( removeItem (removeID));
    }

  return (
    <div>
      <h1>Your Cart</h1>
         { cartProducts.length !==0 ? 
                cartProducts.map((product) => {
                    return (
                        
                        <div className = "card" key={product.id}>
                            <h2>{product.title}</h2>
                            <img src={product.image} alt={product.title} width="100" />
                            <p>Description : {product.description}</p>
                            <p>Price : ${product.price}</p>
                            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                            {/* <Button variant="contained" onClick = {() => addItems(product)} >Add To Cart</Button> &nbsp;
                            <Button variant="contained" onClick={() => {navigate(`/update-product/${product.id}`)}}>Edit</Button>  &nbsp; */}
                            <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>Delete from cart</Button>
                        </div>
                    
                    );
                })
                :
                <h1>No items in cart</h1>
            }
    </div>
  )
}

export default Cart
