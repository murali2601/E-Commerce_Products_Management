import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../Components/useAxios";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";


export default function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const { products } = useAxios(`http://localhost:3000/products/${id}`);

  useEffect(() => {
    setDeleteProduct(products);
  }, [products]);

  //   console.log("From delete id : ",products);

  const handleDelete = (e) => {
    e.preventDefault();

    let res = confirm("Once deleted cannot be restored !!!");
    
    if(res){

    try {
      axios.delete(`http://localhost:3000/products/${id}`, deleteProduct);
      setIsDelete(true);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (err) {
      alert("Error occured ", err);
    }
}
else{
    alert("Deletion cancelled");
}
  };

  return (
    <>
      <h1>Delete Confirmation</h1>
      <Button variant="contained" color="info" onClick = {() => navigate('/products')}>
        Go back
      </Button>

      <form onSubmit={handleDelete}>
        <div className="card" key={products.id}>
          <h2>{products.title}</h2>
          <img src={products.image} alt={products.title} width="100" />
          <p>Description : {products.description}</p>
          <p>Price : ${products.price}</p>
          <p>
            Rating: {products.rating?.rate} ({products.rating?.count} reviews)
          </p>
          <Button variant="contained" color="error" type="submit">
            Delete Product
          </Button>
        </div>
        {isDelete && (
          <Alert severity="warning">
            Your product is Deleted <br />
            Redirecting back to Products Page
          </Alert>
        )}
      </form>
    </>
  );
}
